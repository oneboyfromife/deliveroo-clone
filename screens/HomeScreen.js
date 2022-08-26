import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { 
  UserIcon,
  ChevronDownIcon,
  SearchIcon,
  AdjustmentsIcon,
 } from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import { sanityClient } from '../sanity';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState( [] );

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useEffect(() => {
      sanityClient.fetch(`
      *[_type == "featured"] {
          ...,
        restaurant[]->{
          ...,
          dishes[]->
        }
      }`).then(data => {
        setFeaturedCategories(data);
      });
    }, []);

    console.log(featuredCategories);

  return (
    <SafeAreaView className='bg-white pt-5'>
      <Text className ='text-red-500'>HomeScreen</Text>
      {/* Header */}
      <View className='flex-row pb-3 items-center mx-4 space-x-2'>
        <Image 
          source={{
              uri: 'https://links.papareact.com/wru'
          }}
          className='h-7 w-7 bg-gray-300 rounded-full'
        /> 
        <View className='flex-1'>
            <Text className='font-bold text-gray-400 text-xs'>
              Deliver Now!
            </Text>
            <Text className='font-bold text-xl'>
              Current Location
              <ChevronDownIcon size={20} color="#00CCBB"/>
            </Text>
        </View>

        <UserIcon size={35} color="#00CCBB"/>
      </View>

      {/* Search */}
      <View className='flex-row items-center space-x-2 pb-2 mx-4'>
        <View className='flex-row flex-1 space-x-2 bg-gray-200 p-3'>
          <SearchIcon size={20} color="gray"/>
          <TextInput 
            placeholder='Restaurant and cuisines'
            keyboardType='default'
          />
        </View>

        <AdjustmentsIcon color="#00CCBB"/>
      </View>

      {/* Body */}
      <ScrollView 
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        >
        {/* Categories */}
        <Categories />

        {/* Featured Rows */}

        {featuredCategories?.map(category => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}

        {/* <FeaturedRow
          id='123'
          title='Featured'
          description='Paid placment from our partners'
        /> */}
        {/* Tasty Discounts */}
        {/* <FeaturedRow
          id='1234' 
          title='Tasty Discounts'
          description="Everyone's been enjoying these juicy discounts!"
        /> */}
        {/* Offers Near You */}
        {/* <FeaturedRow
          id='12345' 
          title='Featured'
          description='Why not support you local restaurant tonight!'
        /> */}

      </ScrollView>
     
    </SafeAreaView>
  )
}

export default HomeScreen