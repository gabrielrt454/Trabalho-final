import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { DataTable, FAB, Appbar } from 'react-native-paper';
import { useState, useEffect } from 'react';

import servidor_real from '../utils/servidor_real';

export default function Principal({ navigation }) {
  const [jogo, setJogo] = useState([]);
  const [tecnologias, setTecnologias] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      let jogo = await servidor_real.lerJogo();
    //  let tecnologias = await servidor_real.lerTecnologias();

      if (jogo) {
        console.dir(jogo)
        setJogo(jogo);
      } else {
        console.log(erro);
        alert("Erro ao tentar ler os jogos");
      }
    });

    return unsubscribe;
  }, [navigation]);

  function verDetalhes(jogo) {
    navigation.navigate('Detalhes', jogo);
  }

  return (
    <>
      <Appbar>
        <Appbar.Content title="Informações dos testes" />
      </Appbar>

      <SafeAreaView style={styles.container}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Jogo</DataTable.Title>
            <DataTable.Title>Tecnologia</DataTable.Title>
            <DataTable.Title>Preset</DataTable.Title>
            <DataTable.Title numeric>Fps adquirido</DataTable.Title>
          </DataTable.Header>

          {jogo.map((jogo) => {
            const tecnologia = tecnologias.find(t => t.id === jogo.tecnologia_id);
            return (
              <DataTable.Row key={jogo.id} onPress={() => verDetalhes(jogo)}>
                <DataTable.Cell>{jogo.nome}</DataTable.Cell>
                <DataTable.Cell>{jogo.tecnologia.tecnologias_nome}</DataTable.Cell>
                <DataTable.Cell>{jogo.preset}</DataTable.Cell>
                <DataTable.Cell numeric>{jogo.fps}</DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>

        <StatusBar mode="auto" />
      </SafeAreaView>

      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate('Adicionar')}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});
