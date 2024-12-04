import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    textDecoration: "underline",
  },
  section: {
    marginBottom: 10,
  },
  chartContainer: {
    marginVertical: 10,
  },
  chartPlaceholder: {
    height: 100,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  reportText: {
    marginTop: 10,
  },
});

export default function AiReportDocument({
  data,
  fields,
  year,
  user,
  responseContent,
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>AI-Generated Data Report</Text>
        </View>

        <View style={styles.chartContainer}>
          {fields.map((field) => (
            <View key={field} style={{ marginBottom: 10 }}>
              <Text>Chart for {field}</Text>

              <View style={styles.chartPlaceholder}>
                <Text>[Chart Placeholder]</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.reportText}>{responseContent}</Text>
        </View>
      </Page>
    </Document>
  );
}
