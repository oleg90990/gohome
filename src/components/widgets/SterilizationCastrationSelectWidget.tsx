import React from 'react';
import { StyleSheet } from "react-native";
import { Label, Card, CardItem, Body, View } from 'native-base';
import { YesNo, Gender } from '../../enum/Form';
import SterilizationCastrationSelect from '../../components/elements/SterilizationCastrationSelect';

interface ISterilizationCastrationSelectWidgetProps {
    value: YesNo,
    gender?: Gender,
    onChange: (value: YesNo) => void
}

const GenderSelectWidget: React.FC<ISterilizationCastrationSelectWidgetProps> = ({ value, gender, onChange }) => {  
    return (<Card>
            <CardItem header>
                <Label style={styles.Title}>
                    {(gender === Gender.male ? 'Кастрация' : '')}
                    {(gender === Gender.female ? 'Стирилизация' : '')}
                    {(!gender || gender == Gender.none ? ' Стирилизация/Кастрация' : '')}
                </Label>
            </CardItem>
            <CardItem>
                <SterilizationCastrationSelect
                    value={value}
                    onChange={onChange}
                />
            </CardItem>
        </Card>);
};

const styles = StyleSheet.create({
  Title: {
    fontSize: 18
  }
});

export default GenderSelectWidget;