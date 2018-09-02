import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { ActivityIndicator, Linking, StyleSheet, Text, View } from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Button, ButtonGroup, ListItem } from 'react-native-elements'
import { retrieveItem } from '../config/utils';

import { getData } from '../config/request'

class LocationDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.navigation.state.params['id'] ? this.props.navigation.state.params['id'] : this.props.query.locationId,
            locationDetailsLoading: true,
            machineDetailsLoading: true,
            buttonIndex: 0,
            location: {},
            machines: []
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
          headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
          title: <Text>{navigation.getParam('locationName')}</Text>,
        };
      };

    updateIndex = buttonIndex => {
        this.setState({ buttonIndex })
    }

    getTitle = machine => (
        <Text>
            <Text style={s.textStyle}>{machine.name}</Text>
            <Text>{` (${machine.manufacturer}, ${machine.year})`}</Text>
        </Text>
    )

    componentDidMount() {
        getData(`/locations/${this.state.id}.json`)
        .then(data => {
            this.setState({
                locationDetailsLoading: false,
                location: data,
            })
        })
        
        getData(`/locations/${this.state.id}/machine_details.json`)
        .then(data => {
            this.setState({
                machineDetailsLoading: false,
                machines: data.machines,
            })
        })

        retrieveItem('auth').then((auth) => {
            this.setState({ auth })
        }).catch((error) => console.log('Promise is rejected with error: ' + error)); 
    }

    render() {
        if (this.state.locationDetailsLoading || this.state.machineDetailsLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        const machines = this.state.machines
        const location = this.state.location
   
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    region={{
                        latitude: Number(location.lat),
                        longitude: Number(location.lon),
                        latitudeDelta: 0.03,
                        longitudeDelta: 0.03
                    }}
                    style={s.map}
                    provider={PROVIDER_GOOGLE}
                >
                    <MapView.Marker
                        coordinate={{
                            latitude: Number(location.lat),
                            longitude: Number(location.lon),
                            latitudeDelta: 0.03,
                            longitudeDelta: 0.03,
                        }}
                    />
                </MapView>
                <View style={{ flex: 3 }}>
                    <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={this.state.buttonIndex}
                        buttons={['Machines', 'Info']}
                        containerStyle={{ height: 30 }}
                        selectedButtonStyle={s.buttonStyle}
                        selectedTextStyle={s.textStyle}
                    />
                    {this.state.buttonIndex === 0 ?
                        <View>
                        {this.state.auth && 
                            <Button
                                onPress={() => console.log(this.state.auth.authentication_token, this.state.auth.email)}
                                title={'Add Machine'}
                            />
                        }
                        {
                             machines.map(machine => (
                                <ListItem   
                                    key={machine.id}
                                    title={this.getTitle(machine)}
                                />
                            ))
                        }
                        </View> :
                        <View style={s.locationMeta}>
                            <Text>{location.street}</Text>
                            <Text>{location.city}</Text>
                            <Text>{location.phone}</Text>
                            {location.website && <Text 
                                style={{color: 'blue'}}
                                onPress={() => Linking.openURL(location.website)}
                            >Website</Text>}
                            {location.location_type_id && <Text>{this.props.locations.locationTypes.find(type => type.id === location.location_type_id).name}</Text>}
                            {location.operator_id && <Text>{`Operator: ${this.props.operators.operators.find(operator => operator.id === location.operator_id).name}`}</Text>}
                        </View>
                    }
                </View>
            </View>
        )


    }
}

const s = StyleSheet.create({
    map: {
        flex: 1,
    },
    buttonStyle: {
        backgroundColor: '#D3ECFF',
    },
    textStyle: {
        color: '#000000',
        fontWeight: 'bold',
    },
    locationMeta: {
       marginLeft: 10 
    }
});

const mapStateToProps = ({ locations, operators, query }) => ({ locations, operators, query })
export default connect(mapStateToProps)(LocationDetails);
