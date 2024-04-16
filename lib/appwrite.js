import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';
import { useState } from 'react';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.raedev.aora',
    projectId: '661d59d82e30cf8f7266',
    databaseId: '661d5b4de163e787b296',
    userCollectionId: '661d5b7d903c74d779ef',
    videoCollectionId: '661d5b95055446b1fef7',
    storageId: '661ea56ee011cd2707d1'
}

//Init your react-native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)

    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client);

    export const createUser = async (email, password, username) => {
        try {
            const newAccount = await account.create(
                ID.unique(),
                email,
                password,
                username
            )

            if(!newAccount) throw new Error

            const avatarUrl = avatars.getInitials(username);

            await signIn(email, password)

            const newUser = await databases.createDocument(
                config.databaseId,
                config.userCollectionId,
                ID.unique(),
                {
                    accountId: newAccount.$id,
                    email,
                    username,
                    avatar: avatarUrl
                }
            )
            return newUser;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

export async function signIn(email, password) {
    try {
        const session = await account.createEmailSession(email, password)

        return session;
    } catch (error) {
        throw new Error(error)
    }
}



