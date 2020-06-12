import { IState } from '../types';
import { IDictionaryAnimalType, IDictionaryColorItem, IDictionaryItem } from '../dictionaries';

export const getAnimalById = ({ dictionaries }: IState) => (animalId: number): IDictionaryAnimalType | undefined  => {
    return dictionaries.dictionaries.animals.find(({ id }) => id === animalId);
}

export const getColorsByIds = ({ dictionaries }: IState) => (colors: number[]): IDictionaryColorItem[]  => {
    return dictionaries.dictionaries.colors.filter(({id}) => colors.indexOf(id) > -1);
}

export const getBreedById = ({ dictionaries }: IState) => (breedId: number, animal: number): IDictionaryItem | undefined  => {
    const useAnimal = dictionaries.dictionaries.animals.find(({ id }) => id === animal);
    return useAnimal ? useAnimal.breeds.find(({ id }) => id === breedId) : undefined;
}

export const getBreedsByAnimal = ({ dictionaries }: IState) => (animal: number): IDictionaryItem[]  => {
    const useAnimal = dictionaries.dictionaries.animals.find(({ id }) => id === animal);
    return useAnimal ? useAnimal.breeds : [];
}