import React from 'react'
import './DescriptionBox.css'

export const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-navbox">Description</div>
            <div className="descriptionbox-navbox-fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>Discover the epitome of luxury with our meticulously crafted pieces. This product embodies our dedication to superior quality and timeless elegance. Every detail is designed to enhance your style and comfort, making it a perfect addition to your wardrobe.</p>
            <p>Embrace the luxury. Embrace the elegance. Elevate your style with Velour.</p>
        </div>
    </div>
  )
}
