const { StyleSheet, View, Text } = require("react-native");

const HomeScreen= () => {
    <View>
        <Text style={ styles.container }>This is HomeScreen</Text>
    </View>
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#000000',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
    

module.exports = HomeScreen;