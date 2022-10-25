import React, { useState } from 'react';
import PageLayout from '../../components/PageLayout';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './MapPage.css';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const MapPage = () => {
    const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyARVNnMNYI-oiyPwlvh58YzioKqV37U7b4" });
    const { orderList, onlineGuards } = useSelector(state => state.socket);

    const [isOpen, setIsOpen] = useState(false);
    const center = useMemo(() => ({ lat: 42.873234, lng: 74.590920 }), []);

    if (!isLoaded) return (
        <PageLayout>
            <div className='loadingContainer'>Loading...</div>
        </PageLayout>
    )

    return (
        <PageLayout>
            <GoogleMap
                zoom={13}
                center={center}
                mapContainerClassName="map-container"
            >

                {/* guards (free/ busy) */}
                {onlineGuards?.map(marker => (
                    <Marker
                        key={marker.id}
                        position={{ lat: marker?.coordinates?.latitude || 33, lng: marker?.coordinates?.longitude || 33 }}
                        onClick={() => setIsOpen(marker.id)}
                        icon={marker.status === 1 ?
                            "http://maps.google.com/mapfiles/kml/paddle/grn-stars.png" :
                            "http://maps.google.com/mapfiles/kml/paddle/purple-stars.png"
                        }
                    >
                        {isOpen === marker.id &&
                            <InfoWindow >
                                <div>
                                    <h3>{marker.role}</h3>
                                    <h4>{marker.firstName} {marker.lastName}</h4>
                                    <a href={`tel:${marker.phone}`}>{marker.phone}</a>
                                    <span
                                        className={marker.status === 1 ? 'free' : 'busy'}
                                    >
                                        {marker?.status === 1 ? "Cвободен" : "Занят"}
                                    </span>
                                    <p>{marker?.address}</p>
                                </div>
                            </InfoWindow>}
                    </Marker>
                ))}



                {/* users */}
                {orderList?.map((order) => (
                    <Marker
                        key={order?.id}
                        position={{
                            lat: order?.coordinates?.latitude,
                            lng: order?.coordinates?.longitude,
                        }}
                        onClick={() => setIsOpen(order?.id)}
                        icon="http://maps.google.com/mapfiles/kml/paddle/red-circle.png"
                    >
                        {isOpen === order?.id &&
                            <InfoWindow >
                                <div>
                                    <h3>{order?.user?.role}</h3>
                                    <h4>{order?.user?.firstName} {order?.user?.lastName}</h4>
                                    <a href={`tel:${order?.user?.phone}`}>{order?.user?.phone}</a>
                                    <span className='busy'>SOS</span>
                                    <p>{order?.address}</p>
                                </div>
                            </InfoWindow>}
                    </Marker>
                ))}



            </GoogleMap>
        </PageLayout>
    );
};

export default MapPage;