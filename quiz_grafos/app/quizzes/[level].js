import { View, Text, FlatList, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';
import QuizListCard from '../../components/QuizList/QuizListCard';

export default function QuizByLevel() {
  const navigation = useNavigation();
  const { level } = useLocalSearchParams();
  const [quizList, setQuizList] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: level
    });
    getQuizList();
  }, []);

  const getQuizList = async () => {
    const q = query(collection(db, 'QuizQuestoes'), where('level', '==', level));
    const querySnapshot = await getDocs(q);
    const quizzes = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      quizzes.push({ id: doc.id, ...doc.data() });
    });
    setQuizList(quizzes);
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    quizList.forEach((quiz) => {
      if (answers[quiz.id] === quiz.resposta) {
        correctAnswers++;
      }
    });
    alert(`Você acertou ${correctAnswers} de ${quizList.length} questões.`);
  };

  return (
    <View>
      <FlatList
        data={quizList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <QuizListCard
            quiz={item}
            onAnswerChange={handleAnswerChange}
          />
        )}
      />
      <Button title="Enviar Respostas" onPress={handleSubmit} />
    </View>
  );
}