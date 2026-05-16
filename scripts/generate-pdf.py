"""
Generate the 5-Day Sculpt Plan PDF lead magnet.

Output: public/downloads/sculpt-starter-plan.pdf

Design system:
- Black (#0A0A0A) primary text
- White (#FAFAFA) background
- Accent #C84E2A for badges/dividers/emphasis
- Helvetica family throughout
- Typography-only, no icons or imagery
- Card-style layout for exercises (rounded rect, thin border)
- Big lifts visually larger than accessory cards
"""

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import (
    BaseDocTemplate,
    Flowable,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
)


# ---------- Palette ----------
INK = HexColor("#0A0A0A")
PAPER = HexColor("#FAFAFA")
ACCENT = HexColor("#C84E2A")
SUBDUED = HexColor("#5A5A5A")
HAIRLINE = HexColor("#D8D4CC")


# ---------- Layout ----------
PAGE_W, PAGE_H = LETTER
MARGIN = 0.75 * inch
CONTENT_W = PAGE_W - 2 * MARGIN


# ---------- Output path ----------
ROOT = Path(__file__).resolve().parents[1]
OUT_PATH = ROOT / "public" / "downloads" / "sculpt-starter-plan.pdf"


# =========================================================================
# Page frame: header + footer drawn on every page
# =========================================================================
def draw_page_chrome(canvas, doc):
    canvas.saveState()

    # Header brand mark — centered, 9pt, with accent dot separator
    canvas.setFont("Helvetica-Bold", 8.5)
    canvas.setFillColor(INK)
    left = "SCULPTED"
    right = "BY LARRY"
    sep_gap = 12
    lw = stringWidth(left, "Helvetica-Bold", 8.5)
    rw = stringWidth(right, "Helvetica-Bold", 8.5)
    total = lw + sep_gap + rw
    x_left = (PAGE_W - total) / 2
    y = PAGE_H - 0.45 * inch
    canvas.drawString(x_left, y, left)
    # Accent dot separator
    dot_x = x_left + lw + sep_gap / 2
    canvas.setFillColor(ACCENT)
    canvas.circle(dot_x, y + 2.4, 1.6, fill=1, stroke=0)
    canvas.setFillColor(INK)
    canvas.drawString(x_left + lw + sep_gap, y, right)

    # Footer page number — center, 8pt, accent color
    page_num = canvas.getPageNumber()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(ACCENT)
    canvas.drawCentredString(PAGE_W / 2, 0.5 * inch, f"{page_num} / 9")

    canvas.restoreState()


# =========================================================================
# Custom flowables
# =========================================================================
class HRule(Flowable):
    """Horizontal accent rule."""

    def __init__(self, width=CONTENT_W, thickness=1.4, color=ACCENT, indent=0):
        super().__init__()
        self.width = width
        self.thickness = thickness
        self.color = color
        self.indent = indent

    def wrap(self, aw, ah):
        return self.width, self.thickness + 2

    def draw(self):
        c = self.canv
        c.setStrokeColor(self.color)
        c.setLineWidth(self.thickness)
        c.line(self.indent, 1, self.indent + self.width, 1)


class DayBadge(Flowable):
    """Big DAY N badge — accent block, white text."""

    def __init__(self, text):
        super().__init__()
        self.text = text
        self.w = 1.45 * inch
        self.h = 0.45 * inch

    def wrap(self, aw, ah):
        return self.w, self.h

    def draw(self):
        c = self.canv
        c.setFillColor(ACCENT)
        c.rect(0, 0, self.w, self.h, fill=1, stroke=0)
        c.setFillColor(PAPER)
        c.setFont("Helvetica-Bold", 19)
        c.drawCentredString(self.w / 2, 0.12 * inch, self.text)


class TimeBadge(Flowable):
    """Small time pill, accent border, accent text, transparent fill."""

    def __init__(self, text):
        super().__init__()
        self.text = text
        self.font = "Helvetica-Bold"
        self.size = 8.5
        self.padding_x = 8
        self.padding_y = 5
        tw = stringWidth(text, self.font, self.size)
        self.w = tw + 2 * self.padding_x
        self.h = self.size + 2 * self.padding_y

    def wrap(self, aw, ah):
        return self.w, self.h

    def draw(self):
        c = self.canv
        c.setStrokeColor(ACCENT)
        c.setLineWidth(0.8)
        c.roundRect(0, 0, self.w, self.h, 3, fill=0, stroke=1)
        c.setFillColor(ACCENT)
        c.setFont(self.font, self.size)
        c.drawCentredString(self.w / 2, self.padding_y + 1, self.text)


class ExerciseCard(Flowable):
    """
    Exercise card: rounded rect with thin border.

    big=True renders bolder name, larger card.
    accent_label optional (e.g. 'BIG LIFT', 'ACCESSORY' — currently unused but
    available for future variants).
    """

    def __init__(self, name, prescription, cue, big=False, width=CONTENT_W):
        super().__init__()
        self.name = name
        self.prescription = prescription
        self.cue = cue
        self.big = big
        self.width = width

        self.name_size = 13.5 if big else 11
        self.name_font = "Helvetica-Bold"
        self.presc_size = 10 if big else 9
        self.cue_size = 8.5
        self.padding_top = 9 if big else 7
        self.padding_bot = 9 if big else 7
        self.padding = 11 if big else 9  # horizontal padding

        # Pre-compute cue wrap so height is correct
        self._cue_lines = self._wrap_text(
            cue, "Helvetica", self.cue_size, width - 2 * self.padding
        )
        self._cue_block_h = len(self._cue_lines) * (self.cue_size + 2)

        self.h = (
            self.padding_top
            + self.name_size
            + 4
            + self.presc_size
            + 4
            + self._cue_block_h
            + self.padding_bot
        )

    @staticmethod
    def _wrap_text(text, font, size, max_w):
        words = text.split()
        lines = []
        cur = ""
        for w in words:
            trial = (cur + " " + w).strip() if cur else w
            if stringWidth(trial, font, size) <= max_w:
                cur = trial
            else:
                if cur:
                    lines.append(cur)
                cur = w
        if cur:
            lines.append(cur)
        return lines

    def wrap(self, aw, ah):
        return self.width, self.h

    def draw(self):
        c = self.canv
        # Card body
        c.setStrokeColor(HAIRLINE)
        c.setFillColor(PAPER)
        c.setLineWidth(0.7)
        c.roundRect(0, 0, self.width, self.h, 4, fill=1, stroke=1)

        # Accent left bar for big lifts
        if self.big:
            c.setFillColor(ACCENT)
            c.rect(0, 0, 3, self.h, fill=1, stroke=0)

        x = self.padding
        # Cursor from top
        y = self.h - self.padding_top - self.name_size + 2

        # Name
        c.setFillColor(INK)
        c.setFont(self.name_font, self.name_size)
        c.drawString(x, y, self.name)

        # Prescription
        y -= 4 + self.presc_size
        c.setFillColor(ACCENT)
        c.setFont("Helvetica-Bold", self.presc_size)
        c.drawString(x, y, self.prescription)

        # Cue (multi-line, wrapped)
        y -= 4 + self.cue_size
        c.setFillColor(SUBDUED)
        c.setFont("Helvetica", self.cue_size)
        for line in self._cue_lines:
            c.drawString(x, y, line)
            y -= self.cue_size + 2


class SupersetHeader(Flowable):
    """Small caps header above paired cards."""

    def __init__(self, label="SUPERSET", width=CONTENT_W):
        super().__init__()
        self.label = label
        self.width = width
        self.h = 14

    def wrap(self, aw, ah):
        return self.width, self.h

    def draw(self):
        c = self.canv
        c.setFillColor(ACCENT)
        c.setFont("Helvetica-Bold", 8.5)
        c.drawString(0, 3, self.label)
        # Hairline trailing accent line
        text_w = stringWidth(self.label, "Helvetica-Bold", 8.5)
        c.setStrokeColor(ACCENT)
        c.setLineWidth(0.6)
        c.line(text_w + 8, 6, self.width, 6)


class NumberedMovement(Flowable):
    """
    Numbered mobility movement: bold number + name + duration on top line,
    cue on the wrapped line below. No card border (intentionally lighter
    than training-day cards).
    """

    def __init__(self, number, name, duration, cue, width=CONTENT_W):
        super().__init__()
        self.number = number
        self.name = name
        self.duration = duration
        self.cue = cue
        self.width = width

        self.title_size = 11.5
        self.cue_size = 9.5
        self.indent_left = 22
        self.padding = 8

        self._cue_lines = ExerciseCard._wrap_text(
            cue, "Helvetica", self.cue_size, width - self.indent_left
        )
        self.h = (
            self.padding
            + self.title_size
            + 4
            + len(self._cue_lines) * (self.cue_size + 2)
            + self.padding
        )

    def wrap(self, aw, ah):
        return self.width, self.h

    def draw(self):
        c = self.canv
        # Bottom hairline divider
        c.setStrokeColor(HAIRLINE)
        c.setLineWidth(0.5)
        c.line(0, 0, self.width, 0)

        # Number (accent)
        c.setFillColor(ACCENT)
        c.setFont("Helvetica-Bold", self.title_size)
        y = self.h - self.padding - self.title_size + 2
        c.drawString(0, y, f"{self.number}.")

        # Name + duration
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", self.title_size)
        c.drawString(self.indent_left, y, self.name)
        name_w = stringWidth(self.name, "Helvetica-Bold", self.title_size)
        c.setFillColor(ACCENT)
        c.setFont("Helvetica-Bold", self.title_size - 1.5)
        c.drawString(
            self.indent_left + name_w + 10,
            y,
            f"— {self.duration}",
        )

        # Cue lines
        y -= 4 + self.cue_size
        c.setFillColor(SUBDUED)
        c.setFont("Helvetica", self.cue_size)
        for line in self._cue_lines:
            c.drawString(self.indent_left, y, line)
            y -= self.cue_size + 2


# =========================================================================
# Paragraph styles
# =========================================================================
def make_styles():
    return {
        "cover_brand": ParagraphStyle(
            name="cover_brand",
            fontName="Helvetica-Bold",
            fontSize=13,
            leading=16,
            textColor=INK,
            alignment=TA_CENTER,
            spaceAfter=42,
            tracking=2,
        ),
        "cover_title": ParagraphStyle(
            name="cover_title",
            fontName="Helvetica-Bold",
            fontSize=34,
            leading=40,
            textColor=INK,
            alignment=TA_LEFT,
            spaceAfter=10,
        ),
        "cover_subtitle": ParagraphStyle(
            name="cover_subtitle",
            fontName="Helvetica-Oblique",
            fontSize=13,
            leading=18,
            textColor=SUBDUED,
            alignment=TA_LEFT,
            spaceAfter=18,
        ),
        "body": ParagraphStyle(
            name="body",
            fontName="Helvetica",
            fontSize=11.5,
            leading=18,
            textColor=INK,
            alignment=TA_LEFT,
            spaceAfter=10,
        ),
        "body_sign": ParagraphStyle(
            name="body_sign",
            fontName="Helvetica-Bold",
            fontSize=11.5,
            leading=18,
            textColor=INK,
            alignment=TA_LEFT,
            spaceBefore=10,
        ),
        "section_header": ParagraphStyle(
            name="section_header",
            fontName="Helvetica-Bold",
            fontSize=17,
            leading=22,
            textColor=ACCENT,
            alignment=TA_LEFT,
            spaceAfter=14,
            tracking=1,
        ),
        "day_title": ParagraphStyle(
            name="day_title",
            fontName="Helvetica-Bold",
            fontSize=20,
            leading=23,
            textColor=INK,
            alignment=TA_LEFT,
            spaceBefore=6,
            spaceAfter=3,
        ),
        "day_focus": ParagraphStyle(
            name="day_focus",
            fontName="Helvetica-Oblique",
            fontSize=10,
            leading=14,
            textColor=SUBDUED,
            alignment=TA_LEFT,
            spaceAfter=6,
        ),
        "mobility_footer": ParagraphStyle(
            name="mobility_footer",
            fontName="Helvetica-Oblique",
            fontSize=9.5,
            leading=14,
            textColor=ACCENT,
            alignment=TA_LEFT,
            spaceBefore=12,
        ),
        "signature": ParagraphStyle(
            name="signature",
            fontName="Helvetica",
            fontSize=10,
            leading=15,
            textColor=SUBDUED,
            alignment=TA_LEFT,
            spaceBefore=24,
        ),
    }


# =========================================================================
# Content builders
# =========================================================================
def build_cover(story, styles):
    story.append(Spacer(1, 0.4 * inch))
    story.append(Paragraph("SCULPTED BY LARRY", styles["cover_brand"]))
    story.append(Spacer(1, 0.2 * inch))
    story.append(Paragraph("The 5-Day<br/>Sculpt Plan", styles["cover_title"]))
    story.append(
        Paragraph(
            "A real first week for someone serious about starting again.",
            styles["cover_subtitle"],
        )
    )
    story.append(HRule())
    story.append(Spacer(1, 0.25 * inch))

    for para in [
        "You&rsquo;ve started before.",
        "You&rsquo;ve stopped before, too.",
        "This is five days. Three of them are training. Two of them teach your body how to recover. Both halves count.",
        "If something here doesn&rsquo;t make sense, hit reply on the email you got this from. I read every one.",
    ]:
        story.append(Paragraph(para, styles["body"]))

    story.append(Paragraph("&mdash; Larry", styles["body_sign"]))
    story.append(PageBreak())


def build_how_to_use(story, styles):
    story.append(Spacer(1, 0.1 * inch))
    story.append(Paragraph("HOW TO USE THIS", styles["section_header"]))
    story.append(HRule(width=1.4 * inch, thickness=1.6))
    story.append(Spacer(1, 0.15 * inch))

    paragraphs = [
        "Start any day of the week.",
        "The order matters. Day 1 is lower body. Day 2 is mobility. Day 3 is upper body. Day 4 is mobility. Day 5 is full body.",
        "Don&rsquo;t skip the mobility days. They&rsquo;re not filler. They&rsquo;re how you arrive at the next training day without the previous one still in your hips.",
        "Pick weights you can hit cleanly with two reps in the tank. You&rsquo;re not maxing out. You&rsquo;re learning the movements under load.",
        "Rest periods are real. Rushing the rest doesn&rsquo;t make the workout harder in a useful way. It just makes you sloppier on the next set.",
        "If a movement hurts in a sharp way, stop. Sore is fine. Sharp is information.",
        "This is the plan.",
    ]
    for p in paragraphs:
        story.append(Paragraph(p, styles["body"]))
    story.append(PageBreak())


def day_header(story, styles, badge_text, title, focus, time_text):
    story.append(DayBadge(badge_text))
    story.append(Spacer(1, 0.08 * inch))
    story.append(Paragraph(title, styles["day_title"]))
    story.append(Paragraph(focus, styles["day_focus"]))
    story.append(TimeBadge(time_text))
    story.append(Spacer(1, 0.12 * inch))


def build_day1(story, styles):
    day_header(
        story,
        styles,
        "DAY 1",
        "Lower Body",
        "Build a base in your two most important lower-body patterns &mdash; squat and hinge.",
        "~50-60 minutes",
    )

    story.append(
        ExerciseCard(
            "Goblet Squat",
            "4 × 8   •   Rest 2 min",
            "Hold a dumbbell at chest level. Sit between the heels. Knees track the toes. Heavier than it sounds when done well.",
            big=True,
        )
    )
    story.append(Spacer(1, 7))
    story.append(
        ExerciseCard(
            "Dumbbell Romanian Deadlift",
            "3 × 8   •   Rest 2 min",
            "Hinge from the hips, soft knees. Dumbbells stay close to the legs. Squeeze the glutes at the top.",
            big=True,
        )
    )
    story.append(Spacer(1, 8))
    story.append(SupersetHeader())
    story.append(Spacer(1, 3))
    story.append(
        ExerciseCard(
            "Dumbbell Reverse Lunge",
            "3 × 8/leg",
            "Step back into the lunge, drive through the front heel.",
        )
    )
    story.append(Spacer(1, 4))
    story.append(
        ExerciseCard(
            "Lying Leg Curl",
            "3 × 10   •   Rest 90 sec after both",
            "Hamstring isolation balances the quad work.",
        )
    )
    story.append(Spacer(1, 10))
    story.append(
        ExerciseCard(
            "Standing Calf Raise",
            "3 × 12   •   Rest 60 sec",
            "Full stretch at the bottom. Don&rsquo;t bounce.",
        )
    )
    story.append(Spacer(1, 4))
    story.append(
        ExerciseCard(
            "Plank",
            "3 × 45 sec   •   Rest 60 sec",
            "Brace hard. Squeeze glutes. No sagging hips.",
        )
    )
    story.append(PageBreak())


def build_day2(story, styles):
    day_header(
        story,
        styles,
        "DAY 2",
        "Lower Body Mobility &amp; Flow",
        "Open up everything the lower body day stiffened. Hips, hamstrings, ankles, glutes.",
        "~15 minutes  •  2 rounds through the sequence",
    )

    movements = [
        (1, "Cat-Cow", "45 sec", "Slow flow between rounded and arched spine. Breathe with the movement."),
        (2, "World&rsquo;s Greatest Stretch", "45 sec/side", "Lunge → hand to floor → twist. The whole front and back chain in one movement."),
        (3, "90/90 Hip Switch", "45 sec", "Sit on floor, both knees at 90°. Switch sides slowly. Don&rsquo;t force range &mdash; earn it."),
        (4, "Couch Stretch (or kneeling hip flexor)", "45 sec/side", "Front of the hip. Tuck the pelvis. You&rsquo;ll feel it."),
        (5, "Standing Forward Fold", "45 sec", "Soft knees. Let the head hang. Hamstrings and lower back."),
        (6, "Ankle Rocks", "45 sec/side", "Half-kneel, rock the knee over the toe. Restore the squat pattern."),
        (7, "Glute Bridge (hold)", "45 sec", "Lie on back, feet flat, drive hips up. Hold and squeeze. Wakes the glutes back up."),
    ]
    for num, name, dur, cue in movements:
        story.append(NumberedMovement(num, name, dur, cue))

    story.append(
        Paragraph(
            "Run the sequence twice, slowly. No rest between movements within a round, 60 seconds rest between rounds. If something feels tight, stay in it longer &mdash; there&rsquo;s no clock that matters.",
            styles["mobility_footer"],
        )
    )
    story.append(PageBreak())


def build_day3(story, styles):
    day_header(
        story,
        styles,
        "DAY 3",
        "Upper Body",
        "Push and pull in equal volume &mdash; the foundation of an upper body that works.",
        "~50-60 minutes",
    )
    story.append(
        ExerciseCard(
            "Dumbbell Bench Press",
            "4 × 8   •   Rest 2 min",
            "Dumbbells over the chest, lower until upper arms are parallel to the floor. Press straight up.",
            big=True,
        )
    )
    story.append(Spacer(1, 7))
    story.append(
        ExerciseCard(
            "Chest-Supported Dumbbell Row",
            "4 × 8   •   Rest 2 min",
            "Lie face-down on an incline bench. Pull the dumbbells to your ribs. Removes the back-strain risk.",
            big=True,
        )
    )
    story.append(Spacer(1, 7))
    story.append(SupersetHeader())
    story.append(Spacer(1, 3))
    story.append(
        ExerciseCard(
            "Seated Dumbbell Shoulder Press",
            "3 × 8",
            "Press straight up. Don&rsquo;t flare the elbows.",
        )
    )
    story.append(Spacer(1, 4))
    story.append(
        ExerciseCard(
            "Lat Pulldown",
            "3 × 10   •   Rest 90 sec after both",
            "Pull to the upper chest. Lead with the elbows.",
        )
    )
    story.append(Spacer(1, 7))
    story.append(SupersetHeader())
    story.append(Spacer(1, 3))
    story.append(
        ExerciseCard(
            "Dumbbell Lateral Raise",
            "3 × 12",
            "Slight bend in the elbow. Lift to shoulder height &mdash; not above.",
        )
    )
    story.append(Spacer(1, 4))
    story.append(
        ExerciseCard(
            "Face Pull (cable or band)",
            "3 × 12   •   Rest 60 sec after both",
            "Pull the rope to your face, elbows high. Rear delts and upper back.",
        )
    )
    story.append(Spacer(1, 7))
    story.append(SupersetHeader())
    story.append(Spacer(1, 3))
    story.append(
        ExerciseCard(
            "Cable Row",
            "2 × 10",
            "Sit tall, pull to the belly button, squeeze the shoulder blades.",
        )
    )
    story.append(Spacer(1, 4))
    story.append(
        ExerciseCard(
            "Dumbbell Curl",
            "2 × 10   •   Rest 60 sec after both",
            "Don&rsquo;t swing. Squeeze at the top.",
        )
    )
    story.append(PageBreak())


def build_day4(story, styles):
    day_header(
        story,
        styles,
        "DAY 4",
        "Upper Body Mobility &amp; Flow",
        "Open up everything the upper body day stiffened. T-spine, shoulders, lats, neck.",
        "~15 minutes  •  2 rounds through the sequence",
    )

    movements = [
        (1, "Thread the Needle", "45 sec/side", "On all fours, thread one arm under the other. T-spine rotation, shoulder release."),
        (2, "Cat-Cow", "45 sec", "Same as Day 2. Connects the spine."),
        (3, "Doorway Pec Stretch", "45 sec/side", "Forearm on the doorframe, step forward. Chest opener."),
        (4, "Lat Stretch on a Bench", "45 sec", "Kneel facing a bench, elbows on bench, sit back. Lats lengthen."),
        (5, "Wall Slides", "45 sec", "Back to wall, arms in a goalpost. Slide arms up and down without losing wall contact."),
        (6, "Neck Half-Circles", "45 sec", "Slow, controlled. Chin to chest, ear to shoulder, around. No forcing range."),
        (7, "Open Book Stretch", "45 sec/side", "Side-lying, knees stacked, top arm sweeps open behind you. T-spine rotation."),
    ]
    for num, name, dur, cue in movements:
        story.append(NumberedMovement(num, name, dur, cue))

    story.append(
        Paragraph(
            "Run the sequence twice, slowly. No rest between movements within a round, 60 seconds rest between rounds. The movements look easy. They&rsquo;re not. Pay attention to what&rsquo;s actually opening up.",
            styles["mobility_footer"],
        )
    )
    story.append(PageBreak())


def build_day5(story, styles):
    day_header(
        story,
        styles,
        "DAY 5",
        "Full Body",
        "Tie the week together. Hit every major pattern at least once. Lower volume per movement so you finish strong, not destroyed.",
        "~45-55 minutes",
    )
    story.append(
        ExerciseCard(
            "Trap Bar Deadlift",
            "3 × 6   •   Rest 2-3 min",
            "The week&rsquo;s heaviest pull pattern, in the friendliest position. Push the floor away.",
            big=True,
        )
    )
    story.append(Spacer(1, 7))
    story.append(
        ExerciseCard(
            "Leg Press",
            "3 × 10   •   Rest 90 sec",
            "Lighter squat-pattern volume after Day 1. Feet shoulder-width, full range, controlled.",
            big=True,
        )
    )
    story.append(Spacer(1, 7))
    story.append(SupersetHeader())
    story.append(Spacer(1, 3))
    story.append(
        ExerciseCard(
            "Push-Up (incline if needed)",
            "3 × 10",
            "Body in a straight line. Chest to floor. Use a bench under the hands if needed.",
        )
    )
    story.append(Spacer(1, 4))
    story.append(
        ExerciseCard(
            "Cable Row",
            "3 × 10   •   Rest 90 sec after both",
            "Pull to the belly button. Squeeze the shoulder blades.",
        )
    )
    story.append(Spacer(1, 10))
    story.append(
        ExerciseCard(
            "Dumbbell Reverse Lunge",
            "2 × 8/leg   •   Rest 90 sec",
            "First-half-of-the-week unilateral lower-body work, lighter today. Step back, drive through the heel.",
        )
    )
    story.append(Spacer(1, 4))
    story.append(
        ExerciseCard(
            "Hanging Knee Raise",
            "2 × 10   •   Rest 60 sec",
            "Hang from the bar, raise knees to chest with control. Don&rsquo;t swing. If hanging is too hard, use captain&rsquo;s chair.",
        )
    )
    story.append(PageBreak())


def build_recovery(story, styles):
    story.append(Spacer(1, 0.1 * inch))
    story.append(Paragraph("WHAT FIVE DAYS DOES,<br/>AND WHAT IT DOESN&rsquo;T", styles["section_header"]))
    story.append(HRule(width=1.4 * inch, thickness=1.6))
    story.append(Spacer(1, 0.15 * inch))

    paragraphs = [
        "Five days teaches you what real programming feels like.",
        "It doesn&rsquo;t rebuild your body in a week.",
        "If you got through it, here&rsquo;s what you&rsquo;ve actually proved: your body still knows how to move under load. You can follow a plan written by someone who knows what they&rsquo;re doing. You can show up on the days the plan says to.",
        "That&rsquo;s not nothing. That&rsquo;s the thing most people fail.",
        "The plan that comes next is sixteen weeks. It looks at your sleep, your nutrition, your training history, your recovery. It scales the volume you can actually handle instead of guessing.",
        "When you&rsquo;re ready, the email after this one will tell you how that works.",
        "For now: rest. Eat enough. Drink water. Get to bed before you mean to.",
        "The body builds when you&rsquo;re not in the gym.",
    ]
    for p in paragraphs:
        story.append(Paragraph(p, styles["body"]))
    story.append(PageBreak())


def build_signoff(story, styles):
    story.append(Spacer(1, 0.1 * inch))
    story.append(Paragraph("&mdash; LARRY", styles["section_header"]))
    story.append(HRule(width=1.4 * inch, thickness=1.6))
    story.append(Spacer(1, 0.15 * inch))

    paragraphs = [
        "I&rsquo;m not interested in being your hype guy.",
        "I&rsquo;m interested in whether you actually got stronger, slept better, and looked at yourself in the mirror with less negotiation.",
        "Five days won&rsquo;t do all of that. Sixteen weeks can.",
        "Either way, you&rsquo;ll see me in your inbox over the next few weeks. Real coaching, not motivational rhetoric.",
        "If you want to talk about what comes after this plan, my calendar is open. The email after the next one will have the link.",
    ]
    for p in paragraphs:
        story.append(Paragraph(p, styles["body"]))

    story.append(Spacer(1, 0.6 * inch))
    story.append(
        Paragraph(
            "&mdash; Larry<br/>Tampa, FL<br/>ISSA-Certified Personal Trainer",
            styles["signature"],
        )
    )


# =========================================================================
# Build
# =========================================================================
def build_pdf(out_path: Path):
    out_path.parent.mkdir(parents=True, exist_ok=True)

    frame = Frame(
        MARGIN,
        MARGIN,
        CONTENT_W,
        PAGE_H - 2 * MARGIN,
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
        id="content",
    )

    doc = BaseDocTemplate(
        str(out_path),
        pagesize=LETTER,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=MARGIN,
        bottomMargin=MARGIN,
        title="The 5-Day Sculpt Plan",
        author="Larry Faria - Sculpted by Larry",
        subject="A real first week for someone serious about starting again.",
    )
    doc.addPageTemplates(
        [PageTemplate(id="main", frames=[frame], onPage=draw_page_chrome)]
    )

    styles = make_styles()
    story = []

    build_cover(story, styles)
    build_how_to_use(story, styles)
    build_day1(story, styles)
    build_day2(story, styles)
    build_day3(story, styles)
    build_day4(story, styles)
    build_day5(story, styles)
    build_recovery(story, styles)
    build_signoff(story, styles)

    doc.build(story)


if __name__ == "__main__":
    build_pdf(OUT_PATH)
    size = OUT_PATH.stat().st_size
    print(f"Wrote {OUT_PATH} ({size:,} bytes, {size / 1024:.1f} KB)")
