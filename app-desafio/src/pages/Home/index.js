import React, { useState, useEffect } from 'react';
import ZeLogo from '../../assets/white-logo.svg';
import ReactDOM from 'react-dom';
import './index.css';
import { faMapMarker, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Home() {
    const history = useHistory();
    const [ placeInput, setPlace ] = useState('');

    async function getCoordinates() {
        console.log(placeInput);
        let placeLatitude;
        let placeLongidute;

        const params = {
            key: 'AIzaSyC2sCo0-tuYIMTcmPN-nrJM1biXiTVe3e8',
            address: placeInput
          }
          
          await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {params})
            .then(response => {
                const placeData = response.data;
                // const placeCoordinates = [];
                // placeData.results.map((place) => {
                //     placeCoordinates.push(place.geometry.location);
                // });
                //Pega o primeiro resultado e transforma ele em Json
                let jsonCoordinates = JSON.stringify(placeData.results[0].geometry.location);
                
                //agora dá parse no Json para pegar os dados
                let placeTrueCoordinates = JSON.parse(jsonCoordinates);
                
                placeLatitude = placeTrueCoordinates.lat;
                placeLongidute = placeTrueCoordinates.lng;


                //Agora chama o GraphQL
                getPlaceId(placeLatitude, placeLongidute);               
                
            }).catch(error => {
              console.log(error);
            });
    }

    async function getPlaceId(placeLatitude, placeLongidute) {
        let now = new Date();
        let placeId;

        //2017-08-01T20:00:00.000Z
        console.log(now);

        await axios({
            url: 'https://api.code-challenge.ze.delivery/public/graphql',
            method: 'post',
            data: {
              query: `
                    query pocSearchMethod($now: DateTime!, $algorithm: String!, $lat: String!, $long: String!) {
                        pocSearch(now: $now, algorithm: $algorithm, lat: $lat, long: $long) {
                        __typename
                        id
                        status
                        tradingName
                        officialName
                        deliveryTypes {
                            __typename
                            pocDeliveryTypeId
                            deliveryTypeId
                            price
                            title
                            subtitle
                            active
                        }
                        paymentMethods {
                            __typename
                            pocPaymentMethodId
                            paymentMethodId
                            active
                            title
                            subtitle
                        }
                        pocWorkDay {
                            __typename
                            weekDay
                            active
                            workingInterval {
                            __typename
                            openingTime
                            closingTime
                            }
                        }
                        address {
                            __typename
                            address1
                            address2
                            number
                            city
                            province
                            zip
                            coordinates
                        }
                        phone {
                            __typename
                            phoneNumber
                        }
                        }
                    }
                `,
                variables: 
                {
                    "algorithm": "NEAREST",
                    "lat": placeLatitude,
                    "long": placeLongidute,
                    "now": now
                }
            }
          }).then((result) => {

            const placeResult = result.data;
            
            // const placeIds = [];
            // placeResult.data.pocSearch.map((place) => {
            //     placeIds.push(place.id);
            // });
            //Pega o primeiro resultado
            placeId = placeResult.data.pocSearch[0].id;            
            
            //pega os produtos agora
            getProductData(placeId);

          }).catch(error => {
            console.log(error);
          });
    }


    async function getProductData(placeId) {
        console.log(placeId);

        await axios({
            url: 'https://api.code-challenge.ze.delivery/public/graphql',
            method: 'post',
            data: {
                query: `
                    query poc($id: ID!, $categoryId: Int, $search: String){
                        poc(id: $id) {
                        id
                        products(categoryId: $categoryId, search: $search) {
                            id
                            title
                            rgb
                            images {
                            url
                            }
                            productVariants {
                            availableDate
                            productVariantId
                            price
                            inventoryItemId
                            shortDescription
                            title
                            published
                            volume
                            volumeUnit
                            description
                            subtitle
                            components {
                                id
                                productVariantId
                                productVariant {
                                id
                                title
                                description
                                shortDescription
                                }
                            }
                            }
                        }
                        }
                    }
                `,
                variables: 
                {
                    "id": placeId,
                    "search": "",
                    "categoryId": null
                }
            }
            }).then((result) => {                     
                const productsResult = result.data;
                                
                //carrega os dados no localStorage
                localStorage.setItem('productListJSON', JSON.stringify(productsResult.data.poc.products));

                //chama a página de produtos
                history.push('/products');
            
            }).catch(error => {
            console.log(error);
            });
        
    }



    return (          
        <>
            {/* Header */}
            <div className="header">
                <a href="#" className="logo"><img className="imageLogo" src={ ZeLogo } alt="Logo Zé Delivery"/></a>
                <div className="header-right">
                    <a className="active" href="#">Entrar</a>                  
                </div>
            </div>

            {/* Input */}
            <div className="inputCity">
                <div className="inputBlock">
                <h1><b>Bebidas geladas</b> a <b>preço de mercado</b> na sua casa <b>agora</b></h1>
                <div className="inputContainer">
                    <FontAwesomeIcon className="icon" icon={faMapMarker} />
                    <input onChange={ e => setPlace(e.target.value) } value={ placeInput } className="inputField" type="text" placeholder="Insira o seu endereço para ver os produtos disponíveis" />
                    <button onClick={ getCoordinates } className="searchButton"><FontAwesomeIcon className="searchIcon" icon={faSearch} /></button>
                </div>
                </div>
            </div>

            {/* Footer */}
            <div className="footerDiv">
            <div className="content">
                <div className="footer-grids">
                    <div className="footer one">
                        <h3>More About Company</h3>
                        <p> Nemo enim ipsam voluptatem quia
                        voluptas sit aspernatur aut odit aut fugit, 
                        sed quia consequuntur magni dolores eos qui 
                        ratione voluptatem sequi nesciunt.</p>
                        <p className="adam">- Patrick Victoria, CEO</p>
                        <div className="clear"></div>
                    </div>
                    <div className="footer two">
                        <h3>Keep Connected</h3>
                        <ul>
                            <li><a className="fb" href="#"><i></i>Like us on Facebook</a></li>
                            <li><a className="fb1" href="#"><i></i>Follow us on Twitter</a></li>
                            <li><a className="fb2" href="#"><i></i>Add us on Google Plus</a></li>
                            <li><a className="fb3" href="#"><i></i>Follow us on Dribbble</a></li>
                            <li><a className="fb4" href="#"><i></i>Follow us on Pinterest</a></li>
                        </ul>
                    </div>
                    <div className="footer three">
                        <h3>Contact Information</h3>
                        <ul>
                            <li>The company name <span>Lorem ipsum dolor,</span>Glasglow Dr 40 Fe 72.  </li>
                            <li>1234567890  </li>
                            <li><a href="mailto:info@example.com">contact@example.com</a> </li>
                        </ul>
                    </div>
                    <div className="clear"></div>
                </div>
                <div className="copy-right-grids">
                    <div className="copy-left">
                            <p className="footer-gd">© 2016 Simple Footer Widget. All Rights Reserved | Design by <a href="https://w3layouts.com/" target="_blank">W3layouts</a></p>
                    </div>
                    <div className="copy-right">
                        <ul>
                            <li><a href="#">Company Information</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                        </ul>
                    </div>
                    <div className="clear"></div>
                </div>
                </div>
            </div>
        </>
    );
}

export default Home;