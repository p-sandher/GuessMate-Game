import {StyleSheet, View} from 'react-native';
import Colors from '../../constants/colours';
function Card({children}) {
    return <View style={styles.inputContainer}>{children}</View>;
    
}

export default Card;

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginTop: 100,
        backgroundColor: Colors.primary800,
        marginHorizontal: 24,
        borderRadius: 8,
        elevation: 4, //android only property
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25,
        justifyContent: 'center',
        alignItems: 'center'
    },

});