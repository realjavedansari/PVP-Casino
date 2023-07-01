import React, { useEffect, useState } from 'react';
import '../Game.css';
import $ from 'jquery';

const ClosetGame = () => {
  const [selectedDoor, setSelectedDoor] = useState('');

  useEffect(() => {
    $('.door').click(function () {
      var $closet = $(this).parent();
      setSelectedDoor($closet.attr('id'));
    });
  }, []);

  useEffect(() => {
    if (selectedDoor !== '') {
      var $selectedCloset = $('#' + selectedDoor);
      $selectedCloset.siblings().removeClass('closet-zoom');
      $selectedCloset.addClass('closet-zoom');
      $selectedCloset.find('.door').addClass('door-open');
      $selectedCloset.siblings().find('.door').removeClass('door-open');

      setTimeout(function () {
        $selectedCloset.find('.character').css('opacity', 1);
        $selectedCloset.find('.character').css('z-index', 1);
        if (selectedDoor === 'closet1') {
          $selectedCloset.find('.character').addClass('slideInFromLeft');
        } else if (selectedDoor === 'closet2') {
          $selectedCloset.find('.character').addClass('slideInFromRight');
        } else if (selectedDoor === 'closet3') {
          $selectedCloset.find('.character').addClass('slideInFromLeft');
        } else if (selectedDoor === 'closet4') {
          $selectedCloset.find('.character').addClass('slideInFromRight');
        }
      }, 1000);

      setTimeout(function () {
        var randomNum = Math.floor(Math.random() * 2);
        if (selectedDoor === 'closet1') {
          $selectedCloset.find('.character').html('Loser: Joe Biden');
        } else if (selectedDoor === 'closet2') {
          $selectedCloset.find('.character').html('Loser: Nancy Pelosi');
        } else if (selectedDoor === 'closet3') {
          $selectedCloset.find('.character').html('Loser: Bill Clinton');
        } else if (selectedDoor === 'closet4') {
          $selectedCloset.find('.character').html('Winner: Donald Trump');
        }
        $('.door').addClass('hide-door');
      }, 2000);
    }
  }, [selectedDoor]);

  return (
    <div className="container">
      <div className={`closet ${selectedDoor === 'closet1' ? 'closet-zoom' : ''}`} id="closet1" >
        <div className="door"></div>
        <div className="character" id="biden"></div>
      </div>

      <div className={`closet ${selectedDoor === 'closet2' ? 'closet-zoom' : ''}`} id="closet2">
        <div className="door"></div>
        <div className="character" id="pelosi"></div>
      </div>

      <div className={`closet ${selectedDoor === 'closet3' ? 'closet-zoom' : ''}`} id="closet3">
        <div className="door"></div>
        <div className="character" id="clinton"></div>
      </div>

      <div className={`closet ${selectedDoor === 'closet4' ? 'closet-zoom' : ''}`} id="closet4">
        <div className="door"></div>
        <div className="character" id="trump"></div>
      </div>
    </div>
  );
};

export default ClosetGame;
