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
    doc.setFontSize(18);
    doc.text(`Reporte de ${text}`, 10, 10);
    doc.setFontSize(14);
    doc.text(`Tabla que contiene la lista de ${textoDescriptivo}`, 10, 20);

    // Generar la tabla en el PDF
    const tableRows = generateTableData(data);
    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    // Guardar el documento PDF
    doc.save(`${fileName}.pdf`);
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
        "Tabla que contiene la lista de productos más vendidos en la tienda, ordenados de mayor a menor e incluyendo la cantidad de veces que se realizó una venta"
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
        "Tabla que contiene la lista de productos que se encuentran en inventario de la tienda, incluyendo productos y servicios, cantidades de los productos y el valor total de cada uno en la lista "
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
      textoDescriptivo="Tabla que contiene la lista de empleados que han sido solicitados para más servicios en el salón, incluyendo el número de citas que han realizado."
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
        "Tabla que contiene la lista de servicios más solicitado en la tienda el salón, ordenados de mayor a menor e incluyendo la cantidad de veces que se realizó dicho servicio"
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
        "Tabla que contiene la lista de productos y servicios ofrecidos en el salón, incluyendo el precio y el tipo de servicio/producto que es cada uno"
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

export function BasicTable() {
  return (
    <div>
      <h2 className="text-3xl font-bold">Descargar PDF para:</h2>
      <BestSellerPDFButton />
      <InventoryPDFButton />
      <WantedEmployeePDFButton />
      <WantedServicePDFButton />
      <PriceListPDFButton />
    </div>
  );
}
