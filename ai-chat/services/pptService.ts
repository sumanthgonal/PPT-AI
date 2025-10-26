import PptxGenJS from "pptxgenjs";
import { PresentationData, Slide } from "@/types";

export function generatePowerPoint(presentationData: PresentationData): PptxGenJS {
  const pptx = new PptxGenJS();

  // Set presentation properties
  pptx.author = "AI Chat PPT Generator";
  pptx.company = "AI Assistant";
  pptx.title = presentationData.title;

  // Create title slide
  const titleSlide = pptx.addSlide();
  titleSlide.background = { color: "1F4788" };

  titleSlide.addText(presentationData.title, {
    x: 0.5,
    y: "40%",
    w: "90%",
    h: 1.5,
    fontSize: 44,
    bold: true,
    color: "FFFFFF",
    align: "center",
  });

  // Add content slides
  presentationData.slides.forEach((slide: Slide) => {
    const contentSlide = pptx.addSlide();

    // Add slide title
    contentSlide.addText(slide.title, {
      x: 0.5,
      y: 0.5,
      w: "90%",
      h: 0.75,
      fontSize: 32,
      bold: true,
      color: "1F4788",
    });

    // Add content based on layout
    if (slide.layout === "titleAndContent" || slide.layout === "content") {
      const bullets = slide.content.map((point) => ({
        text: point,
        options: { bullet: true, indentLevel: 0 }
      }));

      contentSlide.addText(bullets, {
        x: 0.5,
        y: 1.5,
        w: "90%",
        h: 4.5,
        fontSize: 18,
        color: "333333",
        valign: "top",
      });
    }

    // Add speaker notes if available
    if (slide.notes) {
      contentSlide.addNotes(slide.notes);
    }
  });

  return pptx;
}

export async function downloadPresentation(
  presentationData: PresentationData,
  filename: string = "presentation.pptx"
): Promise<void> {
  const pptx = generatePowerPoint(presentationData);
  await pptx.writeFile({ fileName: filename });
}
