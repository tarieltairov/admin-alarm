import React from 'react';
import PageLayout from '../components/PageLayout';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import './MapPage.css';
import { useMemo } from 'react';

const MapPage = () => {
    const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyARVNnMNYI-oiyPwlvh58YzioKqV37U7b4" })

    const center = useMemo(() => ({ lat: 42.873234, lng: 74.590920 }), [])

    if (!isLoaded) return <div>Loading...</div>
    return (
        <PageLayout>
            <GoogleMap
                zoom={13}
                center={center}
                mapContainerClassName="map-container"
            >
                <Marker
                    position={{ lat: 42.873234, lng: 74.590920 }}
                    // icon="https://cdn-icons-png.flaticon.com/512/3177/3177361.png"
                    label="Agent"
                    onClick={()=>console.log('click with marker')}
                />
            </GoogleMap>
        </PageLayout>
    );
};

export default MapPage;