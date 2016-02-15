// ==UserScript==
// @name         微信公众号文章webp转为png
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  transform webp image from wechat article to png format
// @author       nobodyiam
// @match        http://mp.weixin.qq.com/*
// @grant        none
// @require http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==
/* jshint -W097 */
'use strict';
(function($) {
    //replace wechat image format from webp to png
    function handleImageNode($imageNode) {
        var originSrc = $imageNode.attr('src');
        if(!originSrc || originSrc.indexOf('http') != 0 || originSrc.indexOf('tp=webp') == -1 ) {
            return;
        }
        $imageNode.attr('src', originSrc.replace('tp=webp', 'tp=png'));
        console.debug('replacing ' + originSrc + ' with ' + $imageNode.attr('src'));
    }

    $(document).ready(function() {
        $('img').each(function(index, img) {
            var $img = $(img);
            handleImageNode($img);
            $img.load(function() {
                handleImageNode($img);
            });
        });
    });
})(jQuery);
