/*
import React from "react";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
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
import logo from '../images/logoBaza.png';
import firma from '../images/firma.jpg'


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

  const handleExport = () => {
    if (!data) {
      alert("No hay datos disponibles");
      return;
    }

    const doc = new jsPDF();
    const img = new Image();
    //const firm = new Image();//
    img.src = logo;
    //firm.src = firma;//

    //firm.onload = () => {//
    img.onload = () => {
      const base64Image = img.src;

      // Agregar el logo y demás contenido al PDF una vez que la imagen esté cargada
      doc.addImage(base64Image, 'PNG', 10, 10, 30, 30);
      doc.setFontSize(18);
      doc.text(`Reporte de ${text}`, 10, 50); // Posición ajustada para evitar superposición
      doc.setFontSize(14);
      doc.text(textoDescriptivo, 10, 60);
      const fechaActual = new Date();
      const fechaFormateada = fechaActual.toLocaleDateString();  // Formato: "11/5/2024" (dependiendo de la localización)
      doc.text(fechaFormateada, 150, 20);
      //doc.addImage(firm, 'JPG', 90, 200, 50, 50); // Position signature at (10, 70) with 50x20 size



      // Generar la tabla en el PDF
      const tableRows = generateTableData(data);
      (doc as any).autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 75, // Posición ajustada para que la tabla comience después del texto
      });

      // Guardar el documento PDF
      doc.save(`${fileName}.pdf`);
    //};
  };//

    img.onerror = () => {
      alert("Error al cargar la imagen del logo");
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
      textoDescriptivo={
        "Tabla sobre la lista de productos más vendidos, ordenados de mayor a menor e \n" +
        "incluyendo las ventas realizadas de cada producto."
      }
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
      textoDescriptivo={
        "Tabla de productos que se encuentran en inventario incluyendo productos y \n" +
        "servicios, cantidades de los productos y el valor total de cada uno en la lista "
      }
      queryKey={["inventory"]}
      queryFn={getInventoryList}
      fileName="reporte_inventario"
      tableColumn={["ID", "Nombre", "Tipo", "Cantidad", "Precio", "Total", ""]}
      generateTableData={(data) =>
        data.inventory.map((item) => [
          item.id,
          item.item_name,
          item.tipo,
          item.cantidad,
          item.price,
          item.total,
          data.total,
        ])
      }
    />
  );
}

function WantedEmployeePDFButton() {
  return (
    <PDFButton
      text="Empleado más cotizado"
      textoDescriptivo={
        "Lista de empleados que han sido solicitados para más servicios en \n" +
        "el salón, incluyendo el número de citas que han realizado."
      }
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
      textoDescriptivo={
        "Lista de servicios más solicitado en el salón, ordenados de mayor a menor e \n" +
        "incluyendo la cantidad de veces que se realizó dicho servicio"
      }
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
      textoDescriptivo={
        "Tabla que contiene la lista de productos y servicios ofrecidos en el salón, \n" +
        "incluyendo el precio y el tipo de servicio/producto que es cada uno"
      }
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
  return (
    <div style={{ width: "100%", padding: "24px" }}>
      <h2
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}
      >
        Descargar PDF para:
      </h2>
      <div
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
      >
        <BestSellerPDFButton />
        <InventoryPDFButton />
        <WantedEmployeePDFButton />
        <WantedServicePDFButton />
        <PriceListPDFButton />
      </div>
    </div>
  );
}
*/
import { faPlus, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
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
import logo from "../images/logoBaza.png"; // Importa el logo
import firma from "../images/descarga.png"; // Importa la firma

interface PDFButtonProps {
  text: string;
  queryKey: string[];
  queryFn: any;
  fileName: string;
  tableColumn: string[];
  generateTableData: any;
  textoDescriptivo: string;
}

const handleAddClick = () => {
  throw new Error("Function not implemented.");
};


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

  const handleExport = () => {
    if (!data) {
      alert("No hay datos disponibles");
      return;
    }

    const doc = new jsPDF();
    const logoImg = new Image();
    const firmaImg = new Image();

    // Contador de imágenes cargadas
    let imagesLoaded = 0;

    // Función para verificar cuando ambas imágenes han sido cargadas
    const handleImageLoad = () => {
      imagesLoaded += 1;
      if (imagesLoaded === 2) {
        // Si ambas imágenes están cargadas, generar el PDF
        doc.addImage(logoImg, "PNG", 10, 10, 30, 30); // Agregar el logo
        doc.addImage(firmaImg, "JPG", 60, 130, 80, 45); // Agregar la firma

        doc.setFontSize(18);
        doc.text(`Reporte de ${text}`, 10, 50); // Título
        doc.setFontSize(14);
        doc.text(textoDescriptivo, 10, 60); // Descripción
        const fechaActual = new Date();
        const fechaFormateada = fechaActual.toLocaleDateString(); // Formato: "11/5/2024"
        doc.text(fechaFormateada, 150, 20); // Fecha

        // Generar la tabla en el PDF
        const tableRows = generateTableData(data);
        (doc as any).autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 75, // Posición ajustada para que la tabla comience después del texto
        });

        // Guardar el documento PDF
        doc.save(`${fileName}.pdf`);
      }
    };

    // Cargar las imágenes
    logoImg.src = logo; // Ruta de la imagen del logo
    firmaImg.src = firma; // Ruta de la imagen de la firma

    // Asignar las funciones onload para que se llamen cuando cada imagen esté lista
    logoImg.onload = handleImageLoad;
    firmaImg.onload = handleImageLoad;

    // Si las imágenes no se cargan, muestra un error
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
      textoDescriptivo={
        "Tabla sobre la lista de productos más vendidos, ordenados de mayor a menor e \n" +
        "incluyendo las ventas realizadas de cada producto."
      }
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
      textoDescriptivo={
        "Tabla de productos que se encuentran en inventario incluyendo productos y \n" +
        "servicios, cantidades de los productos y el valor total de cada uno en la lista "
      }
      queryKey={["inventory"]}
      queryFn={getInventoryList}
      fileName="reporte_inventario"
      tableColumn={["ID", "Nombre", "Tipo", "Cantidad", "Precio", "Total", ""]}
      generateTableData={(data) =>
        data.inventory.map((item) => [
          item.id,
          item.item_name,
          item.tipo,
          item.cantidad,
          item.price,
          item.total,
          data.total,
        ])
      }
    />
  );
}

function WantedEmployeePDFButton() {
  return (
    <PDFButton
      text="Empleado más cotizado"
      textoDescriptivo={
        "Lista de empleados que han sido solicitados para más servicios en \n" +
        "el salón, incluyendo el número de citas que han realizado."
      }
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
      textoDescriptivo={
        "Lista de servicios más solicitado en el salón, ordenados de mayor a menor e \n" +
        "incluyendo la cantidad de veces que se realizó dicho servicio"
      }
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
      textoDescriptivo={
        "Tabla que contiene la lista de productos y servicios ofrecidos en el salón, \n" +
        "incluyendo el precio y el tipo de servicio/producto que es cada uno"
      }
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

/*
// Componente principal para mostrar los botones de exportación
export function BasicTable() {
  return (
    <div style={{ width: "100%", padding: "24px" }}>
      <h2
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}
      >
        Descargar PDF para:
      </h2>
      <div
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
      >
        <BestSellerPDFButton />
        <InventoryPDFButton />
        <WantedEmployeePDFButton />
        <WantedServicePDFButton />
        <PriceListPDFButton />
      </div>
    </div>
  );
}
*/

// Componente principal para mostrar los botones de exportación
export function BasicTable() {
  return (
    <div style={{ width: "100%", padding: "24px" }}>
      
      <div
      
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "repeat(3, 1fr)", // Tres columnas de igual tamaño
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
              onClick={handleAddClick}
            />
      </div>
    </div>
  );
}
