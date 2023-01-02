import { createClient } from '@supabase/supabase-js'

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseUrl = process.env.SUPABASE_URL || 'https://rpqlyjflfozmlereqics.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNjQ3MTkyNiwiZXhwIjoxOTQyMDQ3OTI2fQ.BxW1pBSLcieoZI6w22VsdRnnvvfVjdaIwpR9X8LvNgo';

const supabase = createClient(supabaseUrl, supabaseKey)

export const getLessons = async (moduleId) => {
  const { data, error } = await supabase
    .from('e_lessons')
    .select('Id, Name, Description, LessonOrder')
    .eq('LessonType', 1)
    .eq('ModuleId', moduleId)
    .order('LessonOrder')

  if (error) {
    throw error
  }

  return data.map(item => ({
    id: item.Id,
    name: item.Name,
    description: item.Description,
    lessonOrder: item.LessonOrder
  }))
}

export const getAllLessons = async () => {
  const { data, error } = await supabase
    .from('e_lessons')
    .select('Id, Name, Description, LessonOrder')
    .eq('LessonType', 1)
    .order('LessonOrder')

  if (error) {
    throw error
  }

  return data.map(item => ({
    id: item.Id,
    name: item.Name,
    description: item.Description,
    lessonOrder: item.LessonOrder
  }))
}

export const getLessonSlides = async (lessonId) => {
  const { data, error } = await supabase
    .from('e_slides')
    .select('Id, CategoryId, SlideOrder')
    .eq('LessonId', lessonId)
    .order('SlideOrder')

  if (error) {
    throw error;
  }
      
  return data.map(item => ({
    id: item.Id,
    categoryId: item.CategoryId,
    slideOrder: item.SlideOrder
  }))
}


export const getSlide = async (slideId) => {
  const { data, error } = await supabase
    .from('e_slides')
    .select('Id, CategoryId, Content_English, Content_Thai, SlideOrder, ImageFileName, AudioFileName')
    .eq('Id', slideId)

    if (error) {
      throw error;
    }
    
    if (data.length === 0) {
      return {}
    }

    return {
      id: data[0].Id,
      categoryId: data[0].CategoryId,
      english: data[0].Content_English,
      thai: data[0].Content_Thai,
      slideOrder: data[0].SlideOrder,
      imageFileName: data[0].ImageFileName,
      audioFileName: data[0].AudioFileName
    }
}

export const getSlideMedia = async (slideId) => {
  const { data, error } = await supabase
    .from('e_slidesMedia')
    .select(`
      IsTarget,
      MediaOrder,
      e_media(
        Id,
        English,
        Thai,
        Phonetic,
        AudioFileName,
        ImageFileName,
        Notes
      )    
    `)
    .eq('SlideId', slideId)

    if (error) {
      throw error;
    }
    

    return data.map(item => ({
      isTarget: item.IsTarget,
      mediaOrder: item.MediaOrder,
      id: item.e_media.Id,
      english: item.e_media.English,
      thai: item.e_media.Thai,
      audioFileName: item.e_media.AudioFileName,
      imageFileName: item.e_media.ImageFileName,
      notes: item.e_media.Notes
    }))
}