

import { faCloudArrowUp, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useQuery } from "@tanstack/react-query";
import { IconButton } from "./DashButton.tsx";
import {
  getBestSellerProducts,
  getInventoryList,
  getMostWantedEmployee,
  getPriceList,
  getMostWantedServices,
} from "../services/reportsServices.ts";
import logo from "../images/logoBaza.png";
import firma from "../images/descarga.png";

interface PDFButtonProps {
  text: string;
  queryKey: string[];
  queryFn: any;
  fileName: string;
  tableColumn: string[];
  generateTableData: any;
  textoDescriptivo: string;
}

// Componente genérico para exportar a PDF
function PDFButton({
  text,
  queryKey,
  queryFn,
  fileName,
  tableColumn,
  generateTableData,
  textoDescriptivo,
}: PDFButtonProps) {
  const { data, isLoading, isError } = useQuery({ queryKey, queryFn });

  /*const handleExport = () => {
    if (!data) {
      alert("No hay datos disponibles");
      return;
    }

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      margin: { top: 10, bottom: 10, left: 10, right: 10 }
    });
    doc.setFontSize(12);
    const logoImg = new Image();
    const firmaImg = new Image();

    let imagesLoaded = 0;

    const handleImageLoad = () => {
      imagesLoaded += 1;

      if (imagesLoaded === 2) {
        // Añadir logo
        doc.addImage(logoImg, "PNG", 10, 10, 30, 30);

        // Añadir título y texto descriptivo
        doc.setFontSize(18);
        doc.text(`Reporte de ${text}`, 10, 50);
        doc.setFontSize(14);
        doc.text(textoDescriptivo, 10, 60);

        // Añadir fecha
        const fechaActual = new Date();
        const fechaFormateada = fechaActual.toLocaleDateString();
        doc.text(fechaFormateada, 150, 20);

        // Generar la tabla
        const tableRows = generateTableData(data);
        (doc as any).autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 75,
        });

        // Obtener la posición final de la tabla
        const finalY = (doc as any).autoTable.previous.finalY;

        // Añadir la firma después de la tabla
        doc.addImage(firmaImg, "PNG", 85, finalY + 10, 40, 20);

        // Guardar el archivo
        doc.save(`${fileName}.pdf`);
      }
    };

    // Configurar las imágenes
    logoImg.src = logo;
    firmaImg.src = firma;

    logoImg.onload = handleImageLoad;
    firmaImg.onload = handleImageLoad;

    logoImg.onerror = () => {
      alert("Error al cargar la imagen del logo");
    };
    firmaImg.onerror = () => {
      alert("Error al cargar la imagen de la firma");
    };
  };*/

  const handleExport = () => {
    if (!data) {
      alert("No hay datos disponibles");
      return;
    }
  
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
  
    // Configuración de fuentes y tamaños
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
  
    const logoImg = new Image();
    const firmaImg = new Image();
  
    let imagesLoaded = 0;
  
    const handleImageLoad = () => {
      imagesLoaded += 1;
  
      if (imagesLoaded === 2) {
        // Añadir logo
        doc.addImage(logoImg, "PNG", 10, 10, 30, 30);
  
        // Añadir título centrado
        doc.setFontSize(18);
        doc.text(`Reporte de ${text}`, doc.internal.pageSize.getWidth() / 2, 50, {
          align: "center",
        });
  
        // Añadir texto descriptivo con márgenes ajustados
        doc.setFontSize(12);
        const textWidth = doc.internal.pageSize.getWidth() - 20; // Ajustar márgenes
        doc.text(textoDescriptivo, 10, 60, {
          maxWidth: textWidth,
          align: "justify",
        });
  
        // Añadir fecha
        const fechaActual = new Date();
        const fechaFormateada = fechaActual.toLocaleDateString();
        doc.text(fechaFormateada, doc.internal.pageSize.getWidth() - 50, 20);
  
        // Generar la tabla
        const tableRows = generateTableData(data);
        (doc as any).autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 75, // Ajuste dinámico según el texto
          theme: "striped", // Aplicar líneas alternadas (blanco-gris-blanco)
          styles: {
            fontSize: 10,
            cellPadding: 3,
            overflow: "linebreak",
            textColor: [0, 0, 0], // Texto negro
          },
          alternateRowStyles: {
            fillColor: [245, 245, 245], // Líneas alternadas (gris claro)
          },
          headStyles: {
            fillColor: [41, 128, 185], // Azul en los encabezados
            textColor: [255, 255, 255], // Texto blanco en encabezados
            fontStyle: "bold",
          },
          columnStyles: {
            0: { cellWidth: 15 }, // ID
            1: { cellWidth: 60 }, // Nombre
            2: { cellWidth: 30 }, // Tipo (menos ancho)
            3: { cellWidth: 25 }, // Cantidad (más ancho)
            4: { cellWidth: 25 }, // Precio
            5: { cellWidth: 30 }, // Total
          },
        });
  
        // Obtener la posición final de la tabla
        const finalY = (doc as any).autoTable.previous.finalY;
  
        // Añadir la firma después de la tabla
        doc.addImage(firmaImg, "PNG", 85, finalY + 10, 40, 20);
  
        // Guardar el archivo
        doc.save(`${fileName}.pdf`);
      }
    };
  
    // Configurar las imágenes
    logoImg.src = logo;
    firmaImg.src = firma;
  
    logoImg.onload = handleImageLoad;
    firmaImg.onload = handleImageLoad;
  
    logoImg.onerror = () => {
      alert("Error al cargar la imagen del logo");
    };
    firmaImg.onerror = () => {
      alert("Error al cargar la imagen de la firma");
    };
  };
  
  

  return (
    <IconButton
      id={`${queryKey}PDF`}
      text={text}
      icon={faFilePdf}
      onClick={handleExport}
      disabled={isLoading || isError}
    />
  );
}

// Componentes específicos para cada tipo de reporte
function BestSellerPDFButton() {
  return (
    <PDFButton
      text="Productos más Vendidos"
      textoDescriptivo="Tabla sobre la lista de productos más vendidos, ordenados de mayor a menor e incluyendo las ventas realizadas de cada producto."
      queryKey={["productTop"]}
      queryFn={getBestSellerProducts}
      fileName="reporte_productos_mas_vendidos"
      tableColumn={["ID", "Nombre", "Contador"]}
      generateTableData={(data) =>
        data.bestSellers.map((product) => [
          product.id,
          product.name,
          product.contador,
        ])
      }
    />
  );
}

function InventoryPDFButton() {
  return (
    <PDFButton
      text="Lista de Inventario"
      textoDescriptivo="Tabla de productos que se encuentran en inventario incluyendo productos y servicios, cantidades de los productos y el valor total de cada uno en la lista."
      queryKey={["inventory"]}
      queryFn={getInventoryList}
      fileName="reporte_inventario"
      tableColumn={["ID", "Nombre", "Tipo", "Cantidad", "Precio", "Total"]}
      generateTableData={(data) =>
        data.inventory.map((item) => [
          item.id,
          item.item_name,
          item.tipo,
          item.cantidad,
          item.price,
          item.total,
        ])
      }
    />
  );
}

function WantedEmployeePDFButton() {
  return (
    <PDFButton
      text="Empleado más cotizado"
      textoDescriptivo="Lista de empleados que han sido solicitados para más servicios en el salón, incluyendo el número de citas que han realizado."
      queryKey={["employeeTop"]}
      queryFn={getMostWantedEmployee}
      fileName="reporte_empleados_mas_solicitados"
      tableColumn={["ID", "Nombre", "Contador"]}
      generateTableData={(data) =>
        data.bestSellers.map((employee) => [
          employee.id,
          employee.name,
          employee.contador,
        ])
      }
    />
  );
}

function WantedServicePDFButton() {
  return (
    <PDFButton
      text="Servicios con más demanda"
      textoDescriptivo="Lista de servicios más solicitado en el salón, ordenados de mayor a menor e incluyendo la cantidad de veces que se realizó dicho servicio."
      queryKey={["serviceTop"]}
      queryFn={getMostWantedServices}
      fileName="report_servicios_mas_solicitados"
      tableColumn={["ID", "Nombre", "Contador"]}
      generateTableData={(data) =>
        data.bestSellers.map((service) => [
          service.id,
          service.name,
          service.contador,
        ])
      }
    />
  );
}

function PriceListPDFButton() {
  return (
    <PDFButton
      text="Lista de Precios"
      textoDescriptivo="Tabla que contiene la lista de productos y servicios ofrecidos en el salón, incluyendo el precio y el tipo de servicio/producto que es cada uno."
      queryKey={["priceList"]}
      queryFn={getPriceList}
      fileName="reporte_lista_precios"
      tableColumn={["ID", "Nombre", "Tipo", "Precio"]}
      generateTableData={(data) =>
        data.priceList.map((product) => [
          product.id,
          product.item_name,
          product.tipo,
          product.precio,
        ])
      }
    />
  );
}

// Componente principal para mostrar los botones de exportación
export function BasicTable() {
  const handleBackup = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL as string;
      const response = await fetch(`${API_URL}/users/backup`);
      if (!response.ok) {
        throw new Error("Failed to download backup");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `MBSalon_backup.sql`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error during backup:", error);
    }
  };

  return (
    <div style={{ width: "100%", padding: "24px" }}>
      <div
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "repeat(3, 1fr)",
          width: "100%",
        }}
      >
        <BestSellerPDFButton />
        <InventoryPDFButton />
        <WantedEmployeePDFButton />
        <WantedServicePDFButton />
        <PriceListPDFButton />
        <IconButton
          id={"respaldoBtn"}
          text={"Respaldo"}
          icon={faCloudArrowUp}
          onClick={handleBackup}
        />
      </div>
    </div>
  );
}
