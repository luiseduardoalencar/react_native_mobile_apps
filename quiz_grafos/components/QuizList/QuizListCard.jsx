import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';

export default function QuizListCard({ quiz, onAnswerChange }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    onAnswerChange(quiz.id, answer);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.question}>{quiz.pergunta}</Text>
      <View style={styles.options}>
        <TouchableOpacity
          style={[styles.option, selectedAnswer === 'v' && styles.selectedOption]}
          onPress={() => handleAnswerSelect('v')}
        >
          <Text style={styles.optionText}>Verdadeiro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, selectedAnswer === 'f' && styles.selectedOption]}
          onPress={() => handleAnswerSelect('f')}
        >
          <Text style={styles.optionText}>Falso</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    elevation: 3,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#d3d3d3',
  },
  optionText: {
    fontSize: 16,
  },
});
