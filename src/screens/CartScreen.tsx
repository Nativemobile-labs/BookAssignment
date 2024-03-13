import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store'; 
import { toggleRemoveFavorite } from '../redux/bookSlice';

const CartScreen = () => {
    const dispatch = useDispatch(); // Initialize dispatch
    const booksAdded = useSelector((state: RootState) => state.book.booksAdded);

    const renderItem = ({ item }: any) => {
        return (
            <View style={styles.cardContainer}>
                <Image
                    source={{ uri: `https://covers.openlibrary.org/b/id/${item.cover_id}-L.jpg` }}
                    style={styles.coverImage}
                    resizeMode="cover"
                />
                <View style={styles.cardContent}>
                    <Text style={styles.title}>{item?.title}</Text>
                    <Text style={styles.author}>By {item.authors[0]?.name}</Text>
                    <Text style={styles.year}>Year: {item?.first_publish_year}</Text>
                    <TouchableOpacity style={styles.likeButton} onPress={() => dispatch(toggleRemoveFavorite(item.key))}>
                        <Text style={{color: '#fff',fontWeight:'bold',letterSpacing:0.2,}}>Remove from here</Text>                    
                    </TouchableOpacity>
                    {/* <Text style={styles.more}>Read more....</Text> */}
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {booksAdded.length === 0 ? (
                <View style={styles.emptyView}>
                    <Text style={styles.emptyText}>No Books to Show</Text>
                </View>
            ) : (
                <FlatList
                    data={booksAdded}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.key.toString()}
                    showsVerticalScrollIndicator={false}
                    style={styles.flatList}

                />
            )}
        </SafeAreaView>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: 10,
    },
    coverImage: {
        width: 120,
        height: 180,
    },
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: '#141414',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardContent: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    author: {
        fontSize: 16,
        color: '#ccc',
        marginBottom: 5,
    },
    year: {
        fontSize: 14,
        color: '#ccc',
    },
    likeButton: {
        alignSelf: 'flex-start',
        marginTop: 40,
        backgroundColor:'gray',
        padding:10,
        borderRadius:5,
},
    like: {
        height: 25,
        width: 25,
        tintColor: 'red',
    },
    more: {
        color: 'silver',
        marginTop: 10
    },
    emptyView: {
        height: 50,
        width: '100%',
        alignSelf: 'center',
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        color: '#dfdfdf',
    },
    flatList: {
        width: '100%',
      },
})
