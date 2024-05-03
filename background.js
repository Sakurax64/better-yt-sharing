browser.contextMenus.create({
	id: "share",
	title: "Share",
});

browser.contextMenus.create({
	id: "share-timestamp",
	title: "Share with timestamp",
});

browser.contextMenus.onClicked.addListener(async (info, tab) => {
	if (info.menuItemId === "share") {
		browser.scripting.executeScript({
			target: {
				tabId: tab.id
			},
			func: () => {
				const videoId = window.location.search.match(/v=([^&?]+)/);
				navigator.clipboard.writeText(`https://youtu.be/${videoId[1]}`)
			}

		});

	} else if (info.menuItemId === "share-timestamp") {
		browser.scripting.executeScript({
			target: {
				tabId: tab.id
			},
			func: () => {
				const videoId = window.location.search.match(/v=([^&?]+)/);
				const currentTime = document.getElementsByClassName("ytp-time-current")[0].innerText;
				const colons = [...currentTime.matchAll(/:/g)].length
				navigator.clipboard.writeText(`https://youtu.be/${videoId[1]}&t=${timeToSeconds(currentTime, colons)}`);

				function timeToSeconds(timeString, colons) {
					if (colons == 1) {
						const [minutes, seconds] = timeString.split(':').map(Number);
						return minutes * 60 + seconds;

					} else if (colons > 1) {
						const [hours, minutes, seconds] = timeString.split(':').map(Number);
						return hours * 3600 + minutes * 60 + seconds;
					}
				}
			}
		});
	}
});