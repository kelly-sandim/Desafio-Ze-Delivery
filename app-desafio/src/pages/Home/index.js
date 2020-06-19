import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../../css/style.css';
import { faMapMarker, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import HeaderHome from "../../components/HeaderHome";
import Footer from "../../components/Footer";

function Home() {
    const history = useHistory();
    const [ placeInput, setPlace ] = useState('');

    async function getCoordinates() {
        console.log(placeInput);
        let placeLatitude;
        let placeLongidute;        
        
        const params = {
            key: 'AIzaSyAi3G5cfjj5ir9h7ZU21un_pvQFl5jJ6q4',
            address: placeInput
          }
          
          await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {params})
            .then(response => {
                const placeData = response.data;
                console.log(placeData);
                
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
        
       /*
        POR FAVOR, CASO A CHAVE QUE SERVE PARA A API DO GOOGLE MAPS EXPIRAR NA HORA DOS TESTES
        PODERIAM DESCOMENTAR E UTILIZAR O TRECHO ABAIXO?
        EU ESTOU USANDO UMA EMPRESTADA PORQUE A GOOGLE NÃO ACEITA MEU CARTÃO POR SER ELO
        E EU TENTEI USAR API DE GEOLOCALIZAÇÃO GRÁTIS MAS A API NUNCA ACERTAVA O ENDEREÇO
        */

       /*
        placeLatitude = "-23.632919";
       placeLongidute = "-46.699453";

       //Agora chama o GraphQL
       getPlaceId(placeLatitude, placeLongidute); */
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
            <HeaderHome /> 

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
            
            <Footer />
        </>
    );
}

export default Home;