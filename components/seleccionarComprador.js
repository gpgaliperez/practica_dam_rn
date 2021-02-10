import {CheckBox,Divider, List, Text} from '@ui-kitten/components';
import React, {useContext} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {StoreContext} from '../context/storeContext';

const styles = StyleSheet.create({
  chip: {width: 30, height: 10, borderRadius: 10},
  list: {backgroundColor: 'transparent', marginTop: 10},
  item: {paddingVertical: 20},
});

const SeleccionarComprador = ({producto}) => {
    const {
      obtenerCompradorDelProducto,
      compradores,
      agregarProductoAComprador,
      quitarProductoDeComprador,
    } = useContext(StoreContext);

    const compradorDelProducto = obtenerCompradorDelProducto(producto);
  
    const renderItem = ({item}) => {
      const comprador = item;
      
      agregarProductoAComprador(comprador, producto);

      const compradorAsignado = compradorDelProducto
        .map((c) => c.id)
        .includes(comprador.id);
        console.log("Comprador Asignado: " + compradorAsignado);
    
      return (
        <View style={styles.item}>
          <CheckBox
            status="primary"
            checked={compradorAsignado}
            onChange={() => {
              if (compradorAsignado){
                agregarProductoAComprador(comprador, producto);
              }
              else if (!compradorAsignado) {
                agregarProductoAComprador(comprador, producto);
              } 
              
            }}>
            <Text category="s1">
              {comprador.nombre}
              {'    '}
            </Text>
          </CheckBox>
        </View>
      );
    };
  
    return (
      <List
        style={styles.list}
        data={compradores}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    );
  };
  
  export default SeleccionarComprador;
  