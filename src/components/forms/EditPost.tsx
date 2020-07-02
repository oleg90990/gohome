import React, { useEffect, useState } from 'react';
import { StyleSheet } from "react-native";
import {
  Form,
  Item,
  Input,
  Picker,
  Label,
  Textarea,
  View,
  Button,
  Text,
  Spinner,
  Body,
  Card,
  CardItem
} from 'native-base';

import ColorsSelect from '../elements/ColorsSelect';
import AgeSelect from '../elements/AgeSelect';
import GenderSelect from '../elements/GenderSelect';
import SterilizationCastrationSelect from '../elements/SterilizationCastrationSelect';
import ImageSelect from '../elements/ImagesSelect';
import SocialSelect from '../elements/SocialSelect';

import { connect } from 'react-redux';
import { IState } from '../../store/types';
import { IStateDictionariesReducer, IDictionaryItem } from '../../store/dictionaries';
import { IUser } from '../../store/user';
import { getBreedsByAnimal } from '../../store/dictionaries/getters';
import { Gender, YesNo } from '../../enum/Form';
import { Social } from '../../enum/Social';
import { getLabelSterilization } from '../../helpers/Labels';
import { toItem } from '../../utilites/appNavigation';
import { IItem } from '../../scens/Item/types';
import { ICityItem } from '../../api/apiDictionaries';
import CitySelect from '../elements/CitySelect';
import Api from '../../api/apiAds';
import PhoneInput from '../elements/PhoneInput';

interface IValues extends Omit<IItem, 'user_id' | 'active'> {

}

interface IProps extends IStateDictionariesReducer {
  getBreedsByAnimal: (animal: number) => IDictionaryItem[],
  values: IValues,
  user: IUser
}

const EditPost: React.FC<IProps> = ({ getBreedsByAnimal, animals, values, user }) => { 
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(values.title);
    const [animal_id, setAnimal] = useState(values.animal_id);
    const [colors, setColors] = useState<number[]>(values.colors);
    const [age, setAge] = useState<number>(values.age);
    const [breed_id, setBreed] = useState(values.breed_id);
    const [content, setContent] = useState(values.content);
    const [gender, setGender] = useState<Gender>(values.gender);
    const [sterilization, setSterilization] = useState<YesNo>(values.sterilization);
    const [images, setImages] = useState<string[]>(values.images);
    const [city, setCity] = useState<ICityItem | undefined>(values.city);
    const [socials, setSocials] = useState<Social[]>([Social.vk]);

    function onSave() {
      setLoading(true);

      Api.update({
        id: values.id,
        title,
        images,
        content,
        age,
        colors,
        animal_id,
        breed_id,
        gender,
        sterilization,
        city_id: city ? city.id : undefined,
        socials
      }).then(({ data }) => {
        toItem({ item: data });
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    }

    const isShowVkEdit = () => {
      return values.vkPosts.length > 0;
    }

    return ( !loading ? 
      <Form>
        <Item stackedLabel style={styles.Item}>
          <Label>Город</Label>
          <CitySelect
            onSelected={setCity}
            includedRegins={false}
            value={city}
          />
        </Item>
        <Item stackedLabel style={styles.Item}>
          <Label>
            Заголовок
          </Label>
          <Input
            value={title}
            onChangeText={setTitle}
          />
        </Item>
        <Item stackedLabel style={styles.Item}>
          <Label>
            Животное
          </Label>
          <Picker
            style={{width: '100%'}}
            mode="dropdown"
            onValueChange={setAnimal}
            selectedValue={animal_id}
          >
            {( animals.map(({ id, name }, index) => {
              return <Picker.Item label={name} value={id} key={index} />;
            }) )}
          </Picker>
        </Item>
        <Item stackedLabel style={styles.Item}>
          <Label>
            Порода
          </Label>
          <Picker
            style={{width: '100%'}}
            onValueChange={setBreed}
            selectedValue={breed_id}
          >
            { getBreedsByAnimal(animal_id).map(({ name, id }, index) => {
              return <Picker.Item key={index} label={name} value={id} />
            })}
          </Picker>
        </Item>
        <Item stackedLabel style={styles.Item}>
          <Label>
            Пол
          </Label>
          <GenderSelect
            value={gender}
            onChange={setGender}
            animal={animal_id}
          />
        </Item>
        <Item stackedLabel style={styles.Item}>
          <Label>
             { getLabelSterilization(gender) }
          </Label>
          <SterilizationCastrationSelect
            value={sterilization}
            onChange={setSterilization}
          />
        </Item>
        <Item stackedLabel style={styles.Item}>
          <Label>
            Цвет
          </Label>
          <View style={styles.ColorsSelect}>
            <ColorsSelect 
              value={colors}
              onChange={setColors}
            />
          </View>
        </Item>
        <Item stackedLabel style={styles.Item}>
          <Label>
            Возраст
          </Label>
          <AgeSelect
            style={{width: '100%'}}
            value={age}
            onChange={setAge}
          />
        </Item>
        <Item style={[styles.Item, styles.ViewItem]}>
          <Textarea
            underline
            bordered={false}
            rowSpan={8}
            value={content}
            onChangeText={setContent}
            style={{width: '100%'}}
            placeholder="Описание"
          />
        </Item>
        <View style={styles.ViewItem}>
          <ImageSelect value={images} onChange={setImages} />
        </View>
        { isShowVkEdit() ? <Card style={styles.ViewItem}>
          <CardItem>
            <Body>
              <SocialSelect
                value={socials}
                onChange={setSocials}
                prefix={'Отредактировать'}
                vk={values.vkPosts.length > 0}
              />
            </Body>
          </CardItem>
        </Card> : null }
        <View style={styles.ViewItem}>
          <Button block primary onPress={onSave}>
            <Text> { 'Отредактировать' }</Text>
          </Button>
        </View>
      </Form> : <Spinner />
  );
};

const styles = StyleSheet.create({
  Title: {
    fontSize: 20,
    marginBottom: 10
  },
  ColorsSelect: {
    margin: 15,
    paddingLeft: 10,
    display: 'flex',
    width: '100%'
  },
  Item: {
    marginLeft: 0
  },
  ViewItem: {
    marginBottom: 20
  }
});

const mapStateToProps = (state: IState) => {
  const dictionaries = state.dictionaries;
  const user = state.user.user;
  return {
    ...dictionaries,
    user,
    getBreedsByAnimal: getBreedsByAnimal(state)
  };
};

export default connect(mapStateToProps, {})(EditPost);