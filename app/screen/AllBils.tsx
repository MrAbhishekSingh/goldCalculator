import {View, FlatList, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';
import {
  Avatar,
  Box,
  Divider,
  Heading,
  HStack,
  Text,
  Icon,
  Input,
  Spacer,
  VStack,
  Button,
} from 'native-base';
import {G, Path} from 'react-native-svg';

const data = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    fullName: 'Aafreen Khan',
    timeStamp: '12:47 PM',
    recentText: '88585885',
    avatarUrl:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    fullName: 'Sujitha Mathur',
    timeStamp: '11:11 PM',
    recentText: '88585885',
    avatarUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    fullName: 'Anci Barroco',
    timeStamp: '6:22 PM',
    recentText: '88585885',
    avatarUrl: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg',
  },
  {
    id: '68694a0f-3da1-431f-bd56-142371e29d72',
    fullName: 'Aniket Kumar',
    timeStamp: '8:56 PM',
    recentText: 'All the best',
    avatarUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU',
  },
  {
    id: '28694a0f-3da1-471f-bd96-142456e29d72',
    fullName: 'Kiara',
    timeStamp: '12:47 PM',
    recentText: 'I will call today.',
    avatarUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  },
];
const AllBils = ({navigation}) => {
  return (
    <>
      <SafeAreaView
        style={{flex: 1, padding: 5, marginBottom: 5}}>
        <VStack w="100%" space={5} alignSelf="center">
          <Input
            bg="#fff"
            borderWidth="2"
            borderColor="muted.400"
            placeholder="Search Name, mobile & bill no."
            variant="filled"
            width="100%"
            borderRadius="10"
            py="1"
            px="2"
            InputLeftElement={
              <Icon size="4xl" viewBox="-130 20 800 400">
                <G fillRule="nonzero" stroke="none" strokeWidth={1} fill="none">
                  <Path
                    d="M508.5 481.6l-129-129c-2.3-2.3-5.3-3.5-8.5-3.5h-10.3C395 312 416 262.5 416 208 416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c54.5 0 104-21 141.1-55.2V371c0 3.2 1.3 6.2 3.5 8.5l129 129c4.7 4.7 12.3 4.7 17 0l9.9-9.9c4.7-4.7 4.7-12.3 0-17zM208 384c-97.3 0-176-78.7-176-176S110.7 32 208 32s176 78.7 176 176-78.7 176-176 176z"
                    fill="#a3a3a3"
                  />
                </G>
              </Icon>
            }
          />
        </VStack>
        {data.length > 0 ? (
          <FlatList
            data={data}
            //   keyExtractor={index => index.toString()}
            renderItem={({item, index}) => (
              <Box
                shadow={3}
                bg="#fff"
                my="2"
                borderRadius="10"
                borderWidth="2"
                _dark={{
                  borderColor: 'muted.50',
                }}
                borderColor="muted.400"
                pl={['0', '4']}
                pr={['0', '5']}
                py="2">
                <HStack
                  alignItems="center"
                  px="2"
                  space={[2, 3]}
                  justifyContent="space-between">
                  <Avatar
                    size="48px"
                    source={{
                      uri: item.avatarUrl,
                    }}
                  />
                  <VStack w="35%">
                    <Text
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      color="coolGray.800"
                      bold>
                      {item.fullName}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.recentText}
                    </Text>
                  </VStack>
                  <Spacer />
                  <VStack w="40%">
                    <Text
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      color="coolGray.800"
                      bold>
                      {'Bill no.'}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.recentText}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            )}
          />
        ) : (
          <>
            <Box alignItems="center" justifyContent="center">
              <Heading>No bill found</Heading>
              <Button bg="#10b981" mt="5" size="lg">
                <Text
                  shadow={3}
                  fontSize="md"
                  fontWeight="bold"
                  color="warmGray.50"
                  letterSpacing="lg">
                  Create Bill
                </Text>
              </Button>
            </Box>
          </>
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate('Create Bill')}
          style={{
            elevation: 10,
            borderWidth: 2,
            borderColor: '#059669',
            alignItems: 'center',
            justifyContent: 'center',
            width: 70,
            position: 'absolute',
            bottom: 50,
            right: 20,
            height: 70,
            backgroundColor: '#10b981',
            borderRadius: 100,
          }}>
          <Icon size="4xl" viewBox="-220 20 800 400">
            <G fillRule="nonzero" stroke="none" strokeWidth={1} fill="none">
              <Path
                d="M376 232H216V72c0-4.42-3.58-8-8-8h-32c-4.42 0-8 3.58-8 8v160H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h160v160c0 4.42 3.58 8 8 8h32c4.42 0 8-3.58 8-8V280h160c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z"
                fill="#fff"
              />
            </G>
          </Icon>
        </TouchableOpacity>
        <Text
          shadow={3}
          fontSize="md"
          fontWeight="bold"
          color="primary.900"
          letterSpacing="lg"
          position="absolute"
          bottom="5"
          right="4">
          Create Bill
        </Text>
      </SafeAreaView>
    </>
  );
};

export default AllBils;
