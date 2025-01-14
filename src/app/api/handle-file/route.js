import formidable from 'formidable';
import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import fs from 'fs';


export const config = {
    api: {
      bodyParser: false, 
    },
  };



  export async function POST(req) { 

    try {

      console.log('entrando al server')
      
      const form = await req.formData();
      

      const file = form.get('file');

      if (!file) {
        return NextResponse.json({ success: false, message: 'No se recibió ningún archivo.' }, { status: 400 });
      }


      const buffer = await file.arrayBuffer();

  
      const workbook = XLSX.read(buffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0]; 
      const sheet = workbook.Sheets[sheetName];
  
      const data = XLSX.utils.sheet_to_json(sheet); 
  
    
      const extractedData = data.map((row) => ({
        id: row.ID, 
        tipo: row.Tipo,
        sku: row.id,
        Gtin: row.GTIN,
        nombre: row.Nombre,
        publicado: row.Publicado,
        destacado: row.Destacado,
        visibilidad: row.Visibilidad,
        descripcionCorta: row.DescripcionCorta,
        descripcion: row.Descripcion,
        dia: row.Dia,
        estadoImpuesto: row.EstadoImpuesto,
        existencias: row.Existencias,
        inventario: row.Inventario,
        antidadBajoInventario: row.CantidadBajoInventario,
        permitirReservaAgotado: row.PermitirReservaAgotado,
        vendidoIndividual: row.VendidoIndividual,
        longitud: row.Longitud,
        peso: row.Peso,
        anchura: row.Anchura,
        altura: row.Altura,
        permitirValoracion: row.PermitirValoracion,
        notaDeCompra: row.NotaDeCompra,
        precioRebajado: row.PrecioRebajado,
        precioNormal: row.PrecioNormal,
        categorías: row.Categorías,
        etiquetas: row.Etiquetas,
        claseDeEnvio: row.ClaseDeEnvio,
        imagenes: row.Imagenes,
        limiteDeDescarga: row.LimiteDeDescarga,
        diasDeCaducidad: row.DiasDeCaducidad,
        superior: row.Superior,
        productosAgrupados: row.ProductosAgrupados,
        ventasDirigidas: row.VentasDirigidas,
        ventasCruzadas: row.VentasCruzadas,
        URLexterna: row.URLexterna,
        textoBoton: row.TextoBoton,
        posicion: row.Posicion,
        rank_math_internal_links_processed: row.rank_math_internal_links_processed,
        wp_page_template: row.wp_page_template,
        rank_math_seo_score: row.rank_math_seo_score,
        rank_math_primary_product_cat: row.rank_math_primary_product_cat,
        rank_math_primary_fb_product_set: row.rank_math_primary_fb_product_set,
        _kt_share_control: row._kt_share_control,
        _kad_post_transparent: row._kad_post_transparent,
        _kad_post_layout: row._kad_post_layout,
        _kad_post_content_style: row._kad_post_content_style,
        _kad_post_vertical_padding: row._kad_post_vertical_padding,
        _wp_old_date: row._wp_old_date,
        rank_math_primary_location: row.rank_math_primary_location,
        _woogc_ps_sync_to: row._woogc_ps_sync_to,
        _woogc_ps_maintain_child: row._woogc_ps_maintain_child,
        _woogc_ps_maintain_categories: row._woogc_ps_maintain_categories,
        _woogc_ps_maintain_stock: row._woogc_ps_maintain_stock,
        _stock_at_166: row._stock_at_166,
        _stock_at_167: row._stock_at_167,
        precioOferta: row.PrecioOferta,
      }));

  
      return NextResponse.json({ success: true, data: extractedData });
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Error al procesar el archivo', error },
        { status: 500 }
      );
    }


  }