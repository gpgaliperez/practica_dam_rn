import React, { useContext, useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import { Button, Text, Input, Card, Divider,  } from '@ui-kitten/components';
import { StyleSheet, View, FlatList} from 'react-native';
import { StoreContext } from '../context/storeContext';
import useOrientation, {SCREEN} from '../hooks/useOrientation';



const styles = StyleSheet.create({
    contenedor:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        flexDirection: "column",
    },
    vistaInterna1: {
        
        flexWrap: "wrap",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
            
    },
    vistaInterna2: {
        
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "grey",
        
    },
    button: {
        margin: 2,
        marginTop: 20,
        width: 200,
    },
    buttonGhost: {
        margin: 2,
        width: 200,
        textDecorationLine: 'underline',
    },
    ghostContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    textInput: {
        height: 50,
        paddingHorizontal: 30,
        backgroundColor: 'white',
        marginVertical: 5,
        flexDirection: "column",
        justifyContent: "center"
    },
    text: {
        fontSize: 20,
        fontWeight: '100',
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: "column",
        justifyContent: "center"
      },
      cardText: {textAlign: 'center', fontWeight: 'bold'},
      card: { margin: 5},
     
});

export const ListaCompradores = () => {
    const navigator = useNavigation();
    const {compradores, setCompradores} = useContext(StoreContext);
    const [nombreNuevoComprador, setNombreNuevoComprador] = useState('');
    const [emailNuevoComprador, setEmailNuevoComprador] = useState('');
    const screenDirection = useOrientation();

    const crearComprador = () => {
        setCompradores([
            ...compradores,
            {
                nombre: nombreNuevoComprador,
                email: emailNuevoComprador,
                id: Math.random()
            },
        ]);
        setNombreNuevoComprador("");
        setEmailNuevoComprador("");
    };
   

    return (
        <View
            style={styles.contenedor}> 
            <View
                style={styles.vistaInterna1}>
                <Text style={styles.text}>Ingrese sus datos</Text>
                <Input
                    style={styles.textInput}
                    placeholder='Nombre'
                    placeholderTextColor="black"
                    value={nombreNuevoComprador}
                    onChangeText={texto => setNombreNuevoComprador(texto)}
                />
                <Input
                    style={styles.textInput}
                    placeholder='Email'
                    placeholderTextColor="black"
                    value={emailNuevoComprador}
                    onChangeText={texto => setEmailNuevoComprador(texto)}
                />
                <Button
                    style={styles.button}
                    appearance="outline"
                    status="info"
                    onPress={() => {
                       
                        if (!emailNuevoComprador || !nombreNuevoComprador) {
                            alert("Complete los campos");
                        } else {
                            crearComprador();
                        }
                     
                      }}
                   >
                    CONFIRMAR
                </Button> 
            </View>
            <View style={styles.vistaInterna2}>
                <Text
                style={styles.text}>Lista de compradores</Text>
                <FlatList
                    
                    data={compradores}
                    key={screenDirection}
                    numColumns={screenDirection === SCREEN.LANDSCAPE ? 4 : 2}
                    renderItem={({item}) => {
                    return (
                        <Card
                        style={{...styles.card, backgroundColor: "lightblue"}}
                        key={item.id}>
                        <Text style={styles.cardText}>{item.nombre}</Text>
                        <Text style={styles.cardText}>{item.email}</Text>
                        </Card>
                    );
                    }}
                />
            </View>
        </View>

    );
}
