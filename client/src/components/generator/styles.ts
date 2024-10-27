import {StyleSheet} from "@react-pdf/renderer";

export const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    addressBlock: {
        marginBottom: 20,
    },
    addressLabel: {
        color: '#666',
        marginBottom: 5,
    },
    addressText: {
        marginBottom: 3,
    },
    invoiceDetails: {
        alignItems: 'flex-end',
    },
    invoiceNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    dateText: {
        marginBottom: 5,
    },
    table: {
        flexDirection: 'column',
        marginTop: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#dee2e6',
    },
    tableRow: {
        flexDirection: 'row',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#dee2e6',
    },
    description: {
        flex: 3,
    },
    quantity: {
        flex: 1,
        textAlign: 'center',
    },
    price: {
        flex: 1,
        textAlign: 'right',
    },
    total: {
        flex: 1,
        textAlign: 'right',
    },
    summary: {
        marginTop: 30,
        alignItems: 'flex-end',
    },
    summaryRow: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    summaryLabel: {
        width: 100,
    },
    summaryValue: {
        width: 100,
        textAlign: 'right',
        fontWeight: 'bold',
    },
});