import React, { useState } from 'react';
import { Stack, router } from 'expo-router';
import { groupFormConfig, GroupFormData } from '@/config';
import DynamicForm from '@/components/common/Form/DynamicForm/DynamicForm.component';

export default function CreateGroupScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues: GroupFormData = {
    title: '',
    description: '',
    image: '',
  };

  const handleSubmit = async (data: GroupFormData) => {
    setIsLoading(true);
    try {
      console.log('Saving group:', data);
      // TODO: await createGroup(data);
      
      // Simulación de API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      router.back();
    } catch (error) {
      console.error('Error saving group:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Add new group', 
          headerShown: true 
        }} 
      />
      <DynamicForm
        config={groupFormConfig}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
        isLoading={isLoading}
      />    
    </>
  );
}