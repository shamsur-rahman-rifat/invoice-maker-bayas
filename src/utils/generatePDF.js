import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generatePDF = async (data) => {
  const element = document.getElementById("invoice");

  const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = pdf.internal.pageSize.getHeight()
  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pdfHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
  }  

  const type = data.type === "invoice" ? "invoice" : "quotation";
  const timestamp = new Date().toISOString().split("T")[0];

  const customerName = data.customer
    .trim()
    .replace(/\s+/g, "_")           // spaces → _
    .replace(/[^a-zA-Z0-9_]/g, ""); // remove special chars

  const serial = data.serial
    ? String(data.serial).padStart(3, "0")
    : "XXX";

  const fileName = `${customerName}-${serial}-${type}-${timestamp}.pdf`;

  pdf.save(fileName);
};
