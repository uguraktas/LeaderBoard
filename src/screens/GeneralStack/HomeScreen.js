import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { makeStyles, Input, Button, ListItem } from '@rneui/themed';
import { showMessage } from "react-native-flash-message";

import { useApp } from '../../contexts/app.context';
import leaderboardData from '../../leaderboard.json';

const HomeScreen = () => {
    const styles = useStyles();
    const [search, setSearch] = useState('');
    const { getData, setData } = useApp()

    useEffect(() => {
        const dataArray = Object.values(leaderboardData)
            .filter(item => item.name)
            .map((item, index) => ({ ...item, rank: index + 1 }));
        dataArray.sort((a, b) => b.bananas - a.bananas);
        setData(dataArray.slice(0, 10));
    }, []);

    const handleSearch = () => {
        const dataArray = Object.values(leaderboardData)
            .filter(item => item.name)
            .map((item, index) => ({ ...item, rank: index + 1 }));
        dataArray.sort((a, b) => b.bananas - a.bananas);
        const searchedUser = dataArray.find(item => item.name === search);
        if (!searchedUser) {
            showMessage({
                message: 'This user name does not exist! Please specify an existing user name!',
                type: "danger",
            });
            return;
        }
        const newData = dataArray.slice(0, 10).map(item => ({ ...item, isSearchedUser: item.name === search }));
        if (!newData.find(item => item.name === search)) {
            newData[newData.length - 1] = { ...searchedUser, isSearchedUser: true };
        }
        setData(newData);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Input
                    containerStyle={{ flex: 1 }}
                    leftIcon={{ type: 'ionicon', name: 'search' }}
                    onChangeText={value => setSearch(value)}
                    placeholder='User name'
                />
                <Button containerStyle={{ flex: 1 }} title={'Search'} onPress={handleSearch} />
            </View>

            <View>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>Name</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Content>
                        <ListItem.Title>Rank</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Content>
                        <ListItem.Title>Bananas</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Content>
                        <ListItem.Title>Is Searched User?</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ScrollView contentContainerStyle={styles.tableList}>
                    {getData.map((item, index) => (
                        <ListItem key={index} bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{item.name}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Content>
                                <ListItem.Title>{item.rank}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Content>
                                <ListItem.Title>{item.bananas}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Content>
                                <ListItem.Title>{item.isSearchedUser ? 'Yes' : 'No'}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tableList: {
        paddingBottom: 150
    }
}));

export default HomeScreen;
