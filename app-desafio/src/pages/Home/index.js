import React, { useState } from 'react';
import '../../css/style.css';
import { faMapMarker, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import HeaderHome from "../../components/HeaderHome";
import Footer from "../../components/Footer";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";

function Home() {
    const history = useHistory();
    const [ placeInput, setPlace ] = useState('');

    async function getCoordinates() {
        document.getElementById("loader").style.display = "block";
        console.log(placeInput);
        let placeLatitude;
        let placeLongidute;        
        
        // const params = {
        //     key: '<INSIRA SUA CHAVE DO GOOGLE MAPS API AQUI>',
        //     address: placeInput
        //   }
          
        //   await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {params})
        //     .then(response => {
        //         const placeData = response.data;
        //         console.log(placeData);
                
        //         //Pega o primeiro resultado e transforma ele em Json
        //         let jsonCoordinates = JSON.stringify(placeData.results[0].geometry.location);
                
        //         //agora dá parse no Json para pegar os dados
        //         let placeTrueCoordinates = JSON.parse(jsonCoordinates);
                
        //         placeLatitude = placeTrueCoordinates.lat;
        //         placeLongidute = placeTrueCoordinates.lng;


        //         //Agora chama o GraphQL
        //         getPlaceId(placeLatitude, placeLongidute);               
                
        //     }).catch(error => {
        //         document.getElementById("loader").style.display = "none";
        //         document.getElementById("popup").style.display = "block";
        //     });
        
       //Só para que possa ver que funciona. Só que aqui não vai dar falha se digitar um endereço que não
       //exista na api       
       placeLatitude = "-23.632919";
       placeLongidute = "-46.699453";

       //Agora chama o GraphQL
       getPlaceId(placeLatitude, placeLongidute);
    }

    async function getPlaceId(placeLatitude, placeLongidute) {
        let now = new Date();
        let placeId;
        let placeAddress;
        
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
            
            try {
                //Pega o primeiro resultado
                placeId = placeResult.data.pocSearch[0].id;   
                
                //Pega o endereço
                placeAddress = `${placeResult.data.pocSearch[0].address.address1}, ${placeResult.data.pocSearch[0].address.number} - ${placeResult.data.pocSearch[0].address.city}/${placeResult.data.pocSearch[0].address.province}`;
                                
                //pega os produtos agora
                getProductData(placeId, placeAddress);
            }

            catch(e) {               
                document.getElementById("loader").style.display = "none";
                document.getElementById("popup").style.display = "block";
            }

          }).catch(error => {
                document.getElementById("loader").style.display = "none";
                document.getElementById("popup").style.display = "block";
          });
    }


    async function getProductData(placeId, placeAddress) {
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

                try{                                
                    //carrega os dados no localStorage
                    localStorage.setItem('productListJSON', JSON.stringify(productsResult.data.poc.products));
                    localStorage.setItem('placeAddress', placeAddress);

                    //tira a div de carregamento
                    document.getElementById("loader").style.display = "none";

                    //chama a página de produtos
                    history.push('/products');
                }

                catch(e) {
                    document.getElementById("loader").style.display = "none";
                    document.getElementById("popup").style.display = "block";
                }
            
            }).catch(error => {
                document.getElementById("loader").style.display = "none";
                document.getElementById("popup").style.display = "block";
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

            <Modal />

            <Loader />
        </>
    );
}

export default Home;