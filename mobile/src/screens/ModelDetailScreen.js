import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

export default function ModelDetailScreen({ route, navigation }) {
  const { user } = useContext(AuthContext);
  const { model } = route.params; // modèle passé depuis CatalogueScreen

  const placeOrder = async () => {
    try {
      await api.post("/orders/", {
        client: user.id,
        model: model.id,
        statut: "En attente",
      });
      alert("Commande passée avec succès !");
      navigation.navigate("MyOrders");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la commande");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{model.nom}</Text>
      <Text style={styles.price}>{model.prix} CFA</Text>
      <Text style={styles.description}>{model.description}</Text>

      <Button title="Commander ce modèle" onPress={placeOrder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 10 },
  price: { fontSize: 20, color: "green", marginBottom: 15 },
  description: { fontSize: 16, marginBottom: 30 },
});
