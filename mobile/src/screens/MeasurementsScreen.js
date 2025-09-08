import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

export default function MeasurementsScreen({ navigation }) {
  const { user } = useContext(AuthContext);

  const [measurements, setMeasurements] = useState({
    taille: "",
    poitrine: "",
    hanches: "",
    epaule: "",
    manche: "",
    longueur: "",
  });

  const handleChange = (key, value) => {
    setMeasurements({ ...measurements, [key]: value });
  };

  const saveMeasurements = async () => {
    try {
      await api.post("/measurements/", {
        ...measurements,
        client: user.id,
      });
      alert("Mensurations enregistrées !");
      navigation.navigate("Catalogue");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l’enregistrement");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Saisir vos mensurations</Text>

      <TextInput
        placeholder="Taille (cm)"
        style={styles.input}
        keyboardType="numeric"
        value={measurements.taille}
        onChangeText={(v) => handleChange("taille", v)}
      />

      <TextInput
        placeholder="Tour de poitrine (cm)"
        style={styles.input}
        keyboardType="numeric"
        value={measurements.poitrine}
        onChangeText={(v) => handleChange("poitrine", v)}
      />

      <TextInput
        placeholder="Tour de hanches (cm)"
        style={styles.input}
        keyboardType="numeric"
        value={measurements.hanches}
        onChangeText={(v) => handleChange("hanches", v)}
      />

      <TextInput
        placeholder="Largeur d’épaule (cm)"
        style={styles.input}
        keyboardType="numeric"
        value={measurements.epaule}
        onChangeText={(v) => handleChange("epaule", v)}
      />

      <TextInput
        placeholder="Longueur de manche (cm)"
        style={styles.input}
        keyboardType="numeric"
        value={measurements.manche}
        onChangeText={(v) => handleChange("manche", v)}
      />

      <TextInput
        placeholder="Longueur totale (cm)"
        style={styles.input}
        keyboardType="numeric"
        value={measurements.longueur}
        onChangeText={(v) => handleChange("longueur", v)}
      />

      <Button title="Enregistrer" onPress={saveMeasurements} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
