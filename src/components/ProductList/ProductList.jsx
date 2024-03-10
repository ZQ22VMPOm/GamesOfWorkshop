import React, {useState} from 'react';
import './ProductList.css';
import {ProductItem} from "./ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

const products = [
{id: '1',title: 'Кольцо Всевластья',price:10000000000,description: 'Прелесть,за ним охотятся',img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/One_Ring_Blender_Render.png/274px-One_Ring_Blender_Render.png'}   ,
{id: '2',title: 'Орк щитоносец ',price:10000,description: 'Грязный,не кусается,послушный',img:'https://w7.pngwing.com/pngs/964/776/png-transparent-middle-earth-shadow-of-mordor-orc-sauron-orc-terror-video-game-shield-action-figure-thumbnail.png'},
{id: '3',title: 'Орк воин',price:100000,description: 'Грязный, кусается,послушный',img:'https://c0.klipartz.com/pngpicture/104/647/gratis-png-arte-uruk-hai-dibujando-al-senor-de-los-anillos-berserker-rana.png'}                                ,                      
{id: '4',title: 'Готмог орк',price:10000000000,description: 'Грязный, кусается,непослушный',img:'https://w1.pngwing.com/pngs/327/220/png-transparent-mouth-lord-of-the-rings-gothmog-urukhai-witchking-of-angmar-mouth-of-sauron-orc-mordor.png'},
{id: '5',title: 'дешевое жилье Барад-дур',price:100000000000000000000000000000000000,description: 'большое,жарко,есть сосед по этажу',img:'https://upload.wikimedia.org/wikipedia/ru/6/6a/Mordor.png'},
{id: '6',title: 'дешевое жилье Дол-Гулдур',price:100000000000000000000000000000,description:'много орков,слишком темно',img:'https://static.wikia.nocookie.net/lotr/images/c/cf/Dos_t1_29.jpg/revision/latest?cb=20130614175955&path-prefix=ru'},
{id: '7',title: 'три кольца эльфов',price:100000000000000000000000000000000000000000000000000000000000000000000000000000000000000,description:'нет',img:'https://avatars.mds.yandex.net/get-kinopoisk-post-img/2423210/7b7b3b8c4ebd11b5e1ec926e65e6a882/960'},
{id: '8',title: 'семь колец гномов',price:100000000000000000000000000000000000,description:'нет',img:'https://static.wikia.nocookie.net/lotr/images/f/f6/Dwarfringspic.jpg/revision/latest?cb=20090827075943&path-prefix=ru'},
{id: '9',title: 'ключ активации Cuphead на Xbox',price:100,description:'игра',img:'https://avatars.mds.yandex.net/get-mpic/7464534/img_id2841172949117472607.jpeg/900x1200'},
{id: '10',title: 'ключ активации Baldurs Gate 3 на Xbox',price:1000,description:'игра',img:'https://www.digiseller.ru/preview/949533/p1_4106550_26839f2a.jpg'},
{id: '11',title: 'лучший друг',price:100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,description:'сильный',img:'https://files.vgtimes.ru/download/posts/2022-11/thumbs/1668041005_2517-1667732394-1043572616.jpg'},
{id: '12',title: 'песочные часы',price:1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,description:'могут перематывать время',img:'https://static.wikia.nocookie.net/mortalkombat/images/c/cf/Kronikashourglass.png/revision/latest/scale-to-width-down/310?cb=20231112112451&path-prefix=ru'},
{id: '13',title: 'петрушевый чай',price:10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,description:'это чааааааааааааааааааай',img:'https://masterpiecer-images.s3.yandex.net/24fafadb5d1511eeaf3e3eecbe30a25c:upscaled'},
{id: '10',title: 'ключ активации Baldurs Gate 3 на Xbox',price:1000,description:'игра',img:''}


]









const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

export const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);

    const {tg, queryId, onClose} = useTelegram();

    const onSendData = useCallback(() => {
        
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://85.119.146.179:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
            tg.onClose()
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
            <div className='rev'>
                <h2>Отзывы: </h2>
                <p><b1>Саруман Белый: </b1>Cупер магаз, беру тут орков</p>
                <p><b1>Фродо Беггинс: </b1>Взял кольцо всевластия, прелесть просто</p>
                <p><b1>Субзеро: </b1>Петрушевый чай невкусный, но у нас в горах Линк-Вея больше ничего не растет</p>
                <p><b1>Скорпион: </b1>Ужасный чай, я хотел малиновый!</p>
            </div>
        </div>
    );
};
 