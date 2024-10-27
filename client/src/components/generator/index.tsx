import {Document, Page, Text, View} from "@react-pdf/renderer"
import React from "react"
import { InvoiceData } from "@interfaces/invoice"
import { styles } from "./styles"

export const Generator = (data: InvoiceData) => {
    const {
        invoiceNumber,
        issueDate,
        dueDate,
        fromCompany,
        fromName,
        fromCountry,
        fromEmail,
        toCompany,
        toName,
        toCountry,
        toEmail,
        items,
    } = data;

    const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header Section */}
                <View style={styles.header}>
                    {/* From Address */}
                    <View style={styles.addressBlock}>
                        <Text style={styles.addressLabel}>From</Text>
                        <Text style={styles.addressText}>{fromCompany}</Text>
                        <Text style={styles.addressText}>{fromName}</Text>
                        <Text style={styles.addressText}>{fromCountry}</Text>
                        <Text style={styles.addressText}>{fromEmail}</Text>
                    </View>

                    {/* Invoice Details */}
                    <View style={styles.invoiceDetails}>
                        <Text style={styles.invoiceNumber}>Invoice: {invoiceNumber}</Text>
                        <Text style={styles.dateText}>Issued date: {issueDate}</Text>
                        <Text style={styles.dateText}>Due date: {dueDate}</Text>
                    </View>
                </View>

                {/* To Address */}
                <View style={styles.addressBlock}>
                    <Text style={styles.addressLabel}>To</Text>
                    <Text style={styles.addressText}>{toCompany}</Text>
                    <Text style={styles.addressText}>{toName}</Text>
                    <Text style={styles.addressText}>{toCountry}</Text>
                    <Text style={styles.addressText}>{toEmail}</Text>
                </View>

                {/* Items Table */}
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.description}>Product</Text>
                        <Text style={styles.quantity}>Quantity</Text>
                        <Text style={styles.price}>Unit Price</Text>
                        <Text style={styles.total}>Total</Text>
                    </View>

                    {items.map((item, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.description}>{item.description}</Text>
                            <Text style={styles.quantity}>{item.quantity}</Text>
                            <Text style={styles.price}>$ {item.unitPrice.toFixed(2)}</Text>
                            <Text style={styles.total}>$ {item.total.toFixed(2)}</Text>
                        </View>
                    ))}
                </View>

                {/* Summary */}
                <View style={styles.summary}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Total</Text>
                        <Text style={styles.summaryValue}>$ {totalAmount.toFixed(2)}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};