import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import api from "../services/api";

export default function CatalogueScreen({ navigation }) {
  const [models, setModels] = useState([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await api.get("/models/");
        setModels(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchModels();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catalogue</Text>
      <FlatList
        data={models}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("ModelDetail", { model: item })}
          >
            <View style={styles.card}>
              <Text style={styles.modelName}>{item.nom}</Text>
              <Text>{item.prix} CFA</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  card: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  modelName: { fontWeight: "bold", fontSize: 18 },
});
