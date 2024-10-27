import React, { useState } from 'react'
import { PDFDownloadLink, BlobProvider } from '@react-pdf/renderer'
import { Generator } from "@components/generator"
import { generateDynamicInvoiceValues } from "@utils/generate-invoice-values"
import { format } from 'date-fns'

export const Preview = () => {
  const invoiceData = generateDynamicInvoiceValues()
  const today = new Date()
  const currentMonth = format(today, 'MMMM')
  const currentYear = format(today, 'yyyy')
  const fileName = `${currentMonth} ${currentYear} Arthur Werle Invoice.pdf`
  
  console.log({ invoiceData })
  
  return (
    <div className="">
      <div
        className="text-4xl font-bold">
        INVOICER
      </div>
      
      
      <div className="">
        <PDFDownloadLink
          document={<Generator {...invoiceData} />}
          fileName={fileName}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {({loading}) => (loading ? "Loading document..." : "Download PDF")}
        </PDFDownloadLink>
      </div>
      
      <div className="border rounded-lg overflow-hidden bg-gray-50">
        <BlobProvider document={<Generator {...invoiceData} />}>
          {({url, loading, error}) => {
            if (loading) return <div className="p-4">Loading preview...</div>;
            if (error) return <div className="p-4 text-red-500">Error loading preview!</div>;
            if (!url) return <div className="p-4">No preview available</div>;
            
            return (
              <iframe
                src={url}
                className="w-full h-[800px]"
                title="PDF Preview"
              />
            );
          }}
        </BlobProvider>
      </div>
    </div>
  )
}