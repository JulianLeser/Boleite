for (let i = 0; i < relatedVideosList.length; i++) {

    let uploadDate = new Date(relatedVideosList[i]["ratingDate"]);
    let today = new Date();


    //Handle no focus case
    if (keysToCheckFor.length === 0) {
      keysToCheckFor.push("enjoyment");
    }
    if (minValuesToAccept.length === 0) {
      minValuesToAccept.push(8);
    }



    // check if videos have been rating for specific focus / multifocus
    let isInFocus = true;
    for (let n = 0; n < keysToCheckFor.length; n++) {
      console.log(keysToCheckFor[n]);
      console.log(minValuesToAccept[n]);

      if(
        relatedVideosList[i][keysToCheckFor[n]] < minValuesToAccept[n] || !(keysToCheckFor[n] in relatedVideosList[i])
      ){
        isInFocus = false;
      }
    }


    if (
        (isInFocus)
        //&& today.getTime() - uploadDate.getTime() < 2628288000 * 0.25 // Only show recommendations younger than x months //TODO
    ) {
        //console.log(relatedVideosList);
        for (let j = 0; j < relatedVideosList[i]["items"].length; j++) {

            if (videoCounter >= maxVideos) {
                break;
            }

            let item = relatedVideosList[i]["items"][j];
            //console.log(item);

            let monthsSinceRating = (today.getTime() - uploadDate.getTime()) / 2628288000;
            let monthImportance = 3;
            let timedRecommendationValue = (monthsSinceRating + 1) ** monthImportance;
            let recommendationChance = 30 / timedRecommendationValue;

            //console.log("Months since rating: " + monthsSinceRating + " --> Change for recommendation: " + recommendationChance);

            if (item.snippet != null) {

                if (

                    Math.floor(Math.random() * 101) < recommendationChance

                ) {

                    let pushItem = true;

                    for (let k = 0; k < items.length; k++) {

                        if (item["id"]["videoId"] === items[k]["id"]["videoId"]) {
                            //console.log(item);
                            pushItem = false;

                        }

                    }

                    if (pushItem === true) {
                        parsedDataHiddenVideos.forEach(hiddenVideoId => {
                            if (item["id"]["videoId"] === hiddenVideoId) {
                                pushItem = false;
                            }
                        });
                    }

                    if (pushItem === true) {
                        items.push(item);
                        videoCounter++;
                    }

                }

            }

        }
    }

}
