/**
 * looks for related words/related adjectives to a specific word
 */

class RelevantWords{
    /**will take in display areas, and create storage for our synonym/adjective list and dom elements
     * @param {object} options - display areas for synonyms/adjectives
     */
    constructor(options){
        this.displayAreas = {
            synonymArea: options.synonymArea,
            adjectiveArea:options.adjectiveArea
        }
        this.synonyms = [];
        this.adjectives = [];
        //==========================================================
        //BIND
        this.getSynonyms = this.getSynonyms.bind(this);
        this.gotSynonyms = this.gotSynonyms.bind(this);
        this.displaySynonyms = this.displaySynonyms.bind(this);
        this.displayAdjectives = this.displayAdjectives.bind(this);
        //===========================================================
    }
    /**
     * Makes API calls for synonyms and adjectives
     * @param {string} word - search this word for synonyms/adjectives
     */
    getAllData(word){
        this.getSynonyms(word);
        this.getAdjectives(word);
    }
    /**
     * If called, will make an API call for synonyms
     * @param {string} word  - search this word for synonyms
     */
    getSynonyms(word){
        var ajaxOptions = {
            url:"https://api.datamuse.com/words",
            method:"get",
            dataType:"json",
            data:{
                rel_syn:word
            },
            success:this.gotSynonyms
        }
        $.ajax(ajaxOptions)
    }
    /**
     * The success call for getting synonyms, will save them in a list and display them
     * @param {object} response - data we receieve back (synonyms)
     */
    gotSynonyms(response){
        for(let item in response){
            this.synonyms.push(response[item].word);
        }
        this.displaySynonyms();
    }
    /**
     * If called, will make an API call for adjectives
     * @param {string} word - search this word for adjectives
     */
    getAdjectives = (word) => {
        var ajaxOptions = {
            url:"https://api.datamuse.com/words",
            method:"get",
            dataType:"json",
            data:{
                rel_jjb:word
            },
            success:this.gotAdjectives
        }
        $.ajax(ajaxOptions)
    }
    /**
     * The success call for getting adjectives, will save them in a list and display them
     * @param {object} response - data we receive back (adjectives)
     */
    gotAdjectives = (response) => {
        for(let item in response){
            this.adjectives.push(response[item].word);
        }
        this.displayAdjectives();
    }
    /**
     * clears the display,loops through synonym list, and appends a new div with a class of synonyms to the display area and empties the list
     */
    displaySynonyms(){
        $('.synonyms').remove();
        if(this.synonyms.length === 0){
            this.displayNoneFound('synonyms')
        } else {
            for (let item in this.synonyms){
            let newWord = $('<div>',{
                text:this.synonyms[item],
                class: 'synonyms'
            })
            this.displayAreas.synonymArea.append(newWord);
        }
        
        }
        this.synonyms = [];
    }
    /**
     * clears the display,loops through adjective list and appends a new div with a class of adjective to the display area and empties the list
     */
    displayAdjectives(){
        $('.adjectives').remove();
        if (this.adjectives.length === 0){
            this.displayNoneFound('adjectives')
        } else {
            for (let item in this.adjectives){
            let newWord = $('<div>',{
                text:this.adjectives[item],
                class: 'adjectives',
                css: {
                    'display':'none'
                }
            })
            this.displayAreas.adjectiveArea.append(newWord);
        }

        }
        
        this.adjectives = [];
    }
    displayNoneFound(type){
        const noWord = $('<div>',{
            class:type,
            text:`NO ${type.toUpperCase()} FOUND`
        })
        if (type==='synonyms'){
            this.displayAreas.synonymArea.append(noWord);
        }else {
            this.displayAreas.adjectiveArea.append(noWord);
        }
    }
}
