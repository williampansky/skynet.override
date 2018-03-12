/**
 * @name document.load
 */
// -- call loader elem
loader();

// -- remove style tags and old stylesheets
removeElement('style');
removeElement('link[type="text/css"]');

// -- add stylesheets
addCSS('https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-beta.35/css/uikit.min.css');
addCSS('https://fonts.googleapis.com/css?family=Roboto:300,400,400i,700,700i|Roboto+Mono:400,700|Material+Icons');



/**
 * @function document.ready
 */
document.addEventListener("DOMContentLoaded", ()=> {
	// -- remove loader after 1.5s
	setTimeout(()=> {
		let loader = document.querySelector('.loader');
		loader.classList.add('is-finished');
		document.body.classList.remove('no-scroll');
		setTimeout(()=> { loader.remove(); }, 200);
	}, 2500);
});



/**
 * @function loader();
 * @description Create loader elem to hide content during page init.
 * @memberof functions
 */
function loader() {
	let loader = document.createElement('div');
	loader.classList.add('loader', 'is-loading');
	
	document.body.appendChild(loader);
	document.body.classList.add('no-scroll');
	
	// -- remove loading graphic after 1s 
	setTimeout(()=> {
		document.body.classList.add(
			'loading-finished', 
			'uk-offcanvas-content'
		);
	}, 1000);
}



/**
 * @function removeElement(element);
 * @description Remove elements via querySelectorAll();
 * @memberof functions
 */
function removeElement(element) {
	element = document.querySelectorAll(element);
	if (typeof(element) !== 'undefined' && element !== null) {
		Array.prototype.forEach.call(element, (elem)=> {
			elem.remove();
		});
	}
}



/**
 * @function addCSS(string);
 * @description Append stylesheets to just before the <body> tag opens.
 * @memberof functions
 */
function addCSS(string) {
    let head   = document.getElementsByTagName('head')[0];
    let style  = document.createElement('link');
    style.href = string;
    style.rel  = 'stylesheet';
    head.append(style);
}



/**
 * @name liveResults
 * @description Tasks list.
 * @memberof pageSpecifics
 */
(()=> {
	let element = document.querySelector('.bs-component');
	if (typeof(element) !== 'undefined' && element !== null) {
		let taskList = document.querySelector('.bs-component');
		let table	 = taskList.querySelector('table');
		let head	 = taskList.querySelector('thead > tr');
		
		
		/**
		 * @desc Remove _blank hrefs
		 * @inner
		 */
		let tableLinks = document.querySelectorAll('.bs-component a[target="_blank"]');
		for (let i = 0; i < tableLinks.length; i++)
			tableLinks[i].removeAttribute('target');
		
		
		/**
		 * @desc Alter table style.
		 * @inner
		 */
		let taskWrapper = document.querySelector('.live-results');
		let taskWrapperInner = document.querySelector('.row');
		taskWrapper.classList.add('uk-padding');
		applyFrameworkStyles('uk-card', taskWrapperInner);
		
		
		/**
		 * @desc Add and remove classes from search form buttons.
		 * @inner
		 */
		let tableClasses = taskList.querySelector('table');
		tableClasses.classList.remove('table', 'table-striped', 'table-hover');
		applyFrameworkStyles('uk-table', tableClasses);
		
		
		/**
		 * @desc Change text and add width util classes to thead elems.
		 * @var expand — Expands the column width to fill the remaining space and apply a min-width.
		 * @var shrink — Shrinks the element to reduce the column width to fit its content.
		 * @inner
		 */
		let expand = 'uk-table-expand';
		let shrink = 'uk-table-shrink';
		
		
		/**
		 * @desc thead => View/Status
		 * @inner
		 */
		let view = head.querySelector('th:nth-child(1)');
		view.innerHTML = 'Status';
		view.classList.add(shrink);
		
		
		/**
		 * @desc thead => Task: Client/Project
		 * @inner
		 */
		let description = head.querySelector('th:nth-child(2)');
		description.classList.add('uk-text-truncate');
		
		
		/**
		 * @desc thead => Owner
		 * @inner
		 */
		let owner = head.querySelector('th:nth-child(3)');
		owner.innerHTML = 'Task Owner';
		owner.classList.add(shrink, 'owner');
		owner.removeAttribute('width');
		
		
		/**
		 * @desc thead => Due Date
		 * @inner
		 */
		let due = head.querySelector('th:nth-child(4)');
		due.innerHTML = 'Due';
		due.classList.add(shrink, 'due');
		due.removeAttribute('width');
		
		
		/**
		 * @desc thead => Due Date
		 * @inner
		 */
		let allotted = head.querySelector('th:nth-child(5)');
		allotted.innerHTML = 'Hrs.';
		allotted.classList.add(shrink, 'allotted');
		
		
		/**
		 * @desc thead => Allotted
		 * @inner
		 */
		let logged = head.querySelector('th:nth-child(6)');
		logged.innerHTML = 'Logged';
		logged.classList.add(shrink, 'logged');
		
		
		/**
		 * @desc thead => Progress
		 */
		let progress = head.querySelector('th:nth-child(8)');
		progress.classList.add('uk-width-auto', 'task-progress');
		
		
		/**
		 * @desc tbody => Remove day if there's no tasks.
		 */
		let days = table.getElementsByTagName('td');
		for (let i = 0; i < days.length; i++) {
			let day = days[i];
			let content = day.innerHTML.trim();
			
		    if (content === 'No tasks or tickets currently assigned for this day.') {
		        day.parentNode.style.display = 'none';
		        day.parentNode.classList.add('empty');
		    }
		}
		
		
		/**
		 * @desc tbody => Project link class.
		 */
		let taskLink = table.querySelectorAll('.task-link');
		for (let i = 0; i < taskLink.length; i++)
			taskLink[i].classList.add('uk-text-truncate');
		
		let project = table.querySelectorAll('.client-project');
		for (let i = 0; i < project.length; i++)
			project[i].classList.add('uk-text-meta', 'uk-text-truncate');
		
		
		/**
		 * @desc tbody => Project owner <td> class.
		 */
		let taskOwner = document.querySelectorAll('.bs-component tr td:nth-child(3)');
		for (let i = 0; i < taskOwner.length; i++)
			taskOwner[i].classList.add('owner');
		
		
		/**
		 * @desc tbody => Due date <td> class.
		 */
		let dueDate = document.querySelectorAll('.bs-component tr td:nth-child(4)');
		for (let i = 0; i < dueDate.length; i++)
			dueDate[i].classList.add('due');
		
		
		/**
		 * @desc tbody => Hours allotted <td> class.
		 */
		let hrsAllotted = document.querySelectorAll('.bs-component tr td:nth-child(5)');
		for (let i = 0; i < hrsAllotted.length; i++)
			hrsAllotted[i].classList.add('allotted');
		
		
		/**
		 * @desc tbody => Hours logged <td> class.
		 */
		let hrsLogged = document.querySelectorAll('.bs-component tr td:nth-child(6)');
		for (let i = 0; i < hrsLogged.length; i++)
			hrsLogged[i].classList.add('logged');
		
		
		/**
		 * @desc tbody => Add "% complete" uk-tooltip to progress <td> class elements. Takes the value of progress[value="##"] and applies that to a new title attribute.
		 * @name progressTooltips
		 */
		let taskProgress = document.querySelectorAll('.bs-component tr td:nth-child(8)');
		for (let i = 0; i < taskProgress.length; i++)
			taskProgress[i].classList.add('task-progress');
		
		let task_progress = document.querySelectorAll('.bs-component tr td:nth-child(8) progress');
		for (let i=0; i < task_progress.length; i++)
			task_progress[i].setAttribute('uk-tooltip', 'duration: 20; delay: 0;');
		
		// -- 90% Complete
		/** @memberof progressTooltips */
		let prog90 = document.querySelectorAll('.bs-component tr td:nth-child(8) > progress[value="90"]');
		if (typeof(prog90) !== 'undefined' && prog90 !== null)
			for (let i = 0; i < prog90.length; i++) { prog90[i].setAttribute('title', '90% Complete'); }
		
		// -- 80% Complete
		/** @memberof progressTooltips */
		let prog80 = document.querySelectorAll('.bs-component tr td:nth-child(8) > progress[value="80"]');
		if (typeof(prog80) !== 'undefined' && prog80 !== null)
			for (let i = 0; i < prog80.length; i++) { prog80[i].setAttribute('title', '80% Complete'); }
		
		// -- 70% Complete
		/** @memberof progressTooltips */
		let prog70 = document.querySelectorAll('.bs-component tr td:nth-child(8) > progress[value="70"]');
		if (typeof(prog70) !== 'undefined' && prog70 !== null)
			for (let i = 0; i < prog70.length; i++) { prog70[i].setAttribute('title', '70% Complete'); }
		
		// -- 60% Complete
		/** @memberof progressTooltips */
		let prog60 = document.querySelectorAll('.bs-component tr td:nth-child(8) > progress[value="60"]');
		if (typeof(prog60) !== 'undefined' && prog60 !== null)
			for (let i = 0; i < prog60.length; i++) { prog60[i].setAttribute('title', '60% Complete'); }
		
		// -- 50% Complete
		/** @memberof progressTooltips */
		let prog50 = document.querySelectorAll('.bs-component tr td:nth-child(8) > progress[value="50"]');
		if (typeof(prog50) !== 'undefined' && prog50 !== null)
			for (let i = 0; i < prog50.length; i++) { prog50[i].setAttribute('title', '50% Complete'); }
		
		// -- 40% Complete
		/** @memberof progressTooltips */
		let prog40 = document.querySelectorAll('.bs-component tr td:nth-child(8) > progress[value="40"]');
		if (typeof(prog40) !== 'undefined' && prog40 !== null)
			for (let i = 0; i < prog40.length; i++) { prog40[i].setAttribute('title', '40% Complete'); }
		
		// -- 30% Complete
		/** @memberof progressTooltips */
		let prog30 = document.querySelectorAll('.bs-component tr td:nth-child(8) > progress[value="30"]');
		if (typeof(prog30) !== 'undefined' && prog30 !== null)
			for (let i = 0; i < prog30.length; i++) { prog30[i].setAttribute('title', '30% Complete'); }
		
		// -- 20% Complete
		/** @memberof progressTooltips */
		let prog20 = document.querySelectorAll('.bs-component tr td:nth-child(8) > progress[value="20"]');
		if (typeof(prog20) !== 'undefined' && prog20 !== null)
			for (let i = 0; i < prog20.length; i++) { prog20[i].setAttribute('title', '20% Complete'); }
		
		// -- 10% Complete
		/** @memberof progressTooltips */
		let prog10 = document.querySelectorAll('.bs-component tr td:nth-child(8) > progress[value="10"]');
		if (typeof(prog10) !== 'undefined' && prog10 !== null)
			for (let i = 0; i < prog10.length; i++) { prog10[i].setAttribute('title', '10% Complete'); }
		
		// -- 0% Complete
		/** @memberof progressTooltips */
		let prog00 = document.querySelectorAll('.bs-component tr td:nth-child(8) > progress[value="0"]');
		if (typeof(prog00) !== 'undefined' && prog00 !== null)
			for (let i = 0; i < prog00.length; i++) { prog00[i].setAttribute('title', '0% Complete'); }
		
		
		/**
		 * Create uk-label elem if td.view has a .label child.
		 * @function createTaskLabel
		 */
		 let hasLabel = document.querySelectorAll('.view > .label');
		 for (let i=0; i < hasLabel.length; i++) {
			hasLabel[i].parentNode.parentNode.classList.add('has-label');
			
			if (hasLabel[i].classList.contains('updated'))
				hasLabel[i].parentNode.parentNode.classList.add('label-updated');
			
			if (hasLabel[i].classList.contains('new-reply'))
				hasLabel[i].parentNode.parentNode.classList.add('label-reply');
		}
		
		/**
		 * @desc Adjust created labels with text and style.
		 */
		setTimeout(()=> {
			// -- updated
			let taskUpdated = document.querySelectorAll('.label-updated');
			for (let i=0; i < taskUpdated.length; i++) {
				let element = document.createElement('div');
				element.innerHTML = `<span class="uk-label skynet-label pulse">Updated</span>`;
				taskUpdated[i].appendChild(element);
			}
			
			// -- replies
			let taskReplied = document.querySelectorAll('.label-reply');
			for (let i=0; i < taskReplied.length; i++) {
				let element = document.createElement('div');
				element.innerHTML = `<span class="uk-label uk-label-success skynet-label">New Reply</span>`;
				taskReplied[i].appendChild(element);
			}
		}, 400);
	}
})();



/**
 * @name taskLogs
 * @description Single task pages.
 * @memberof pageSpecifics
 */
(()=> {
	let element = document.getElementById('tasklogs-table');
	if (typeof(element) !== 'undefined' && element !== null) {
		
		/**
		 * @desc Remove 'Back to Project' button;
		 */
		let back = document.querySelectorAll('.option-button')[0];
		back.id = 'backToProject';
		back.style.display = 'none';
		
		/**
		 * @desc Add container to info wrapper elem.
		 */
		let info = document.querySelector('.info-wrapper');
		info.classList.add('uk-margin-medium-bottom');
		
		/**
		 * @desc Add style and positioning to new log button.
		 */
		document.querySelectorAll('.option-button')[1].id = 'logButton';
		let newLogWrap	= document.getElementById('logButton');
		let logButton	= document.getElementById('new-log-link');
		newLogWrap.classList.add('uk-container', 'uk-container-smaller', 'uk-text-center');
		newLogWrap.classList.remove('option-button');
		logButton.classList.add('uk-button', 'uk-button-primary', 'uk-width-1-1');
		logButton.classList.remove('btn');
		
		/**
		 * @desc Task logs (comments) conversions; turn log comments into individual cards.
		 */
		(()=> {
			let taskLogs = document.getElementById('tasklogs-table');
			applyFrameworkStyles('uk-table', taskLogs);
			taskLogs.classList.add(
				'uk-container', 
				'uk-container-smaller'
			);
			
			// -- add uk-card and sky-task classes to each log item
			let log = document.querySelectorAll('#tasklogs-table tbody > tr');
			for (let i=0; i < log.length; i++)
				log[i].classList.add('sky-task', 'uk-card', 'uk-card-default', 'uk-card-body');
			
			// -- hide hours if hours = null
			let emptyHours = document.getElementsByClassName('hours');
			for (let i = 0; i < emptyHours.length; i++) {
				let isEmpty = emptyHours[i];
				let content = isEmpty.innerHTML.trim();
				if (content == '0.00')
					isEmpty.classList.add('is-empty');
			}
			
			
			/**
			 * @desc Remove empty paragraph tags from .comment elems.
			 */
			let emptyParagraphs = document.querySelectorAll('comment p');
			for (let i = 0; i < emptyParagraphs.length; i++) {
				if (emptyParagraphs[i].innerHTML.match(/^\s*&nbsp;\s*$/))
					emptyParagraphs[i].remove();
			}
		})();
		
		
		/**
		 * @desc Remove and convert last tr.total-hours;
		 */
		let last = document.querySelector('.total-hours');
		if (typeof(last) !== 'undefined' && last !== null) {
			last.classList.remove('sky-task', 'uk-card-default');
			last.classList.add('uk-card-secondary', 'uk-light');
			last.querySelector('td:first-child').classList.remove('right');
			last.querySelector('td:first-child').classList.add('uk-float-left');
			last.querySelector('td:last-child').classList.add('uk-float-right');
		}
		
		
		/**
		 * @desc #details informational items
		 */
		let details = document.getElementById('details');
		details.querySelector('.info-list.no-border > li:nth-child(5)').classList.add('uk-width-1-1@m');
		details.classList.add(
			'uk-grid', 
			'uk-grid-collapse', 
			'uk-width-1-1', 
			'uk-child-width-1-4@m'
		);
		
		
		/**
		 * @desc avatar testing
		 */
		let taskedToLink = details.querySelector('.info-list li a');
		let taskedTo = taskedToLink.parentNode.id = 'taskedTo';
		if (taskedToLink.innerHTML == 'William Pansky') {
			let avatar = document.createElement('div');
			avatar.id = 'avatar_williampansky'
			avatar.classList.add('user-avatar-wrapper');
			avatar.innerHTML = `<img class="user-avatar" src="https://williampansky.com/favicon-32x32.png" />`;
			taskedToLink.prepend(avatar);
		}
		
		
		/**
		 * @desc modify property boxes
		 */
		let property = details.getElementsByClassName('property-box');
		let propTitle = details.getElementsByClassName('pb-title');
		for (let i=0; i < property.length; i++) {
			property[i].classList.add(
				'uk-text-lead', 
				'uk-text-center', 
				'uk-card', 
				'uk-card-default', 
				'uk-card-small', 
				'uk-card-body'
			);
		}
		for (let i=0; i < propTitle.length; i++)
			propTitle[i].classList.add('uk-text-meta');
		property[4].classList.add('uk-width-1-1');
		
		
		/**
		 * @desc modify log description items
		 */
		let info1 = details.querySelectorAll('.info-list')[0];
		info1.classList.add(
			'uk-grid', 
			'uk-grid-collapse', 
			'uk-width-1-1', 
			'uk-child-width-1-2@m', 
			'uk-card', 
			'uk-card-default', 
			'uk-card-small', 
			'uk-card-body', 
			'uk-margin'
		);
		
		let info2 = details.querySelectorAll('.info-list')[1];
		info2.classList.add(
			'uk-grid', 
			'uk-grid-collapse', 
			'uk-width-1-1', 
			'uk-child-width-1-2@m', 
			'uk-card', 
			'uk-card-default', 
			'uk-card-small', 
			'uk-card-body', 
			'uk-margin'
		);
		
		
		/**
		 * Hide log description items if empty.
		 * @memberof taskLogs
		 * @inner
		 */
		let infoItems = details.querySelectorAll('.info-list li');
		if (infoItems[5].querySelector('strong').innerHTML === 'CVS Module: ')
			infoItems[5].style.display = 'none';
		
		if (infoItems[6].querySelector('strong').innerHTML === 'Current URL: ')
			infoItems[6].style.display = 'none';
		
		if (infoItems[7].querySelector('strong').innerHTML === 'Beta URL: ')
			infoItems[7].style.display = 'none';
		
		if (infoItems[8].querySelector('strong').innerHTML === 'Google Doc: ')
			infoItems[8].style.display = 'none';
		
		
		/**
		 * @desc description tabs
		 */
		let switcher = document.getElementById('descr-tab');
		switcher.classList.add('uk-subnav', 'uk-subnav-pill');
		switcher.setAttribute('uk-switcher', '');
		
		// -- description wrapper
		let descriptionWrapper = document.getElementById('details-description');
		descriptionWrapper.classList.add('uk-margin');
		
		// -- description box
		let description = document.getElementById('gen-descr');
		description.classList.add(
			'uk-card', 
			'uk-card-default', 
			'uk-card-small', 
			'uk-card-body', 
			'uk-width-1-1', 
			'uk-margin'
		);
		
		
		/**
		 * @desc spread tasks
		 */
		let spreadWrapper = document.querySelector('form.standard');
		if (typeof(spreadWrapper) !== 'undefined' && spreadWrapper !== null) {
			spreadWrapper.classList.add('uk-width-1-1');
			spreadWrapper.querySelector('.spread').classList.add(
				'uk-card', 
				'uk-card-default', 
				'uk-card-small', 
				'uk-card-body', 
				'uk-margin'
			);
			spreadWrapper.querySelector('h4').classList.add('uk-form-label');
			
			let spreadGrid = spreadWrapper.querySelector('.pto-date');
			spreadGrid.classList.add(
				'uk-grid', 
				'uk-grid-collapse', 
				'uk-width-1-1', 
				'uk-child-width-1-5@m'
			);
			spreadGrid.setAttribute('uk-grid', '');
			
			let spreadItems = spreadWrapper.querySelectorAll('.pto-date > .spread-task-div');
			for (let i=0; i < spreadItems.length; i++)
				spreadItems[i].classList.add('uk-margin');
		}
		
		
		/**
		 * @desc radialIndicator.js
		 */
		setTimeout(()=> {
			let radialWrapper = document.getElementById('prog-bar');
				
			let radialObj = radialIndicator(radialWrapper, {
				barColor: {
						0	: '#ff0000',
						15	: '#f98fa2',
						35	: '#f45884',
						50	: '#f23e60',
						75	: '#72cca8',
						80	: '#49d1b1',
						100	: '#32d296'
				},
				barWidth	:	4,
				fontWeight	:	'normal',
				frameTime	:	20,
				initValue	:	0,
				percentage	:	true
			});
			
			// -- let radialWrapper = document.getElementById('prog-bar');
			let radialProg = radialWrapper.querySelector('.prog');
			radialProg.id = 'task-progress';
			radialProg.style.display = 'none';
			
			let task_progress = document.getElementById('task-progress');
			
			// -- https://css-tricks.com/snippets/javascript/strip-whitespace-from-string/
			radialProg = task_progress.innerHTML.replace('%', '').replace(/\s+/g, '');
			
			task_progress.setAttribute('data-progress', radialProg);
			
			if (radialProg.innerHTML === '100%') { let radialProg = radialProg.innerHTML = '100'; }
			if (radialProg.innerHTML === '90%') { let radialProg = radialProg.innerHTML = '90'; }
			if (radialProg.innerHTML === '80%') { let radialProg = radialProg.innerHTML = '80'; }
			if (radialProg.innerHTML === '70%') { let radialProg = radialProg.innerHTML = '70'; }
			if (radialProg.innerHTML === '60%') { let radialProg = radialProg.innerHTML = '60'; }
			if (radialProg.innerHTML === '50%') { let radialProg = radialProg.innerHTML = '50'; }
			if (radialProg.innerHTML === '40%') { let radialProg = radialProg.innerHTML = '40'; }
			if (radialProg.innerHTML === '30%') { let radialProg = radialProg.innerHTML = '30'; }
			if (radialProg.innerHTML === '20%') { let radialProg = radialProg.innerHTML = '20'; }
			if (radialProg.innerHTML === '10%') { let radialProg = radialProg.innerHTML = '10'; }
			if (radialProg.innerHTML === '0%') { let radialProg = radialProg.innerHTML = '0'; }
			
			setTimeout(()=> {
				let radialValue = radialProg;
				radialObj.animate(radialValue);
			}, 2500);
		}, 300);
	}
})();



/**
 * @name logForm
 * @description New log form entry.
 * @memberof pageSpecifics
 * @memberof taskLogs
 */
(()=> {
	let element = document.getElementById('logform');
	if (typeof(element) !== 'undefined' && element !== null) {
		
		
		/**
		 * @desc uncheck notify by default (used to be checked by default)
		 */
		setTimeout(()=> {
			document.getElementById('toggle-all').click();
		}, 600);
		
		
		/**
		 * @desc control functionality of the new log button
		 */
		let newLogBtn = document.getElementById('new-log-link');
		newLogBtn.classList.add('uk-button', 'uk-button-default');
		// newLogBtn.setAttribute('uk-toggle', '');
		// newLogBtn.href = '#logform';
		newLogBtn.addEventListener('click', ()=> {
			newLogBtn.innerHTML = 'New Log';
			if (form.classList.contains('uk-open')) {
				document.body.classList.remove('no-scroll');
				form.classList.remove('uk-open');
				form.style.display = 'none';
			} else {
				document.body.classList.add('no-scroll');
				form.classList.add('uk-open');
				form.classList.remove('skynet-modal-closed');
				form.style.display = 'block';
			}
		});
		
		
		/**
		 * @desc transform #logform into full-screen modal
		 */
		let form = document.getElementById('logform');
		let radio = form.getElementsByTagName('input[type="radio"]');
		form.classList.add(
			'uk-form-stacked', 
			'uk-modal', 
			'uk-modal-full'
		);
		form.setAttribute('uk-modal', '');
		setTimeout(()=> {
			form.classList.remove('uk-container');
		}, 300);
		
		let fieldset = form.getElementsByTagName('fieldset');
		fieldset[0].classList.add('uk-modal-dialog');
		
		let task = document.getElementById('task-log');
		task.classList.add('uk-first-column', 'uk-width-1-1', 'uk-padding-small');
		
		let progress = document.getElementById('progress');
		progress.classList.add('uk-padding-small');
		
		let progress2 = document.querySelector('#progress:not(.uk-padding-small)');
		if (typeof(progress2) !== 'undefined' && progress2 !== null) {
			progress2.id = 'progressParent';
			progressParent = document.getElementById('progressParent');
			progressParent.classList.add('uk-padding-small');
		}
		
		let log_info = document.getElementById('log-info');
		log_info.classList.add('uk-padding-small');
		
		let log_contacts = document.getElementById('log-contacts');
		let notify = log_contacts.querySelector('input[name="mailto[]"]'); // todo: is this being used?
		let checkbox = log_contacts.getElementsByTagName('input[type="checkbox"]'); // todo: is this being used?
		log_contacts.classList.add('uk-padding-small');
		
		let task_contacts = document.getElementById('people-list');
		task_contacts.setAttribute('uk-grid', '');
		task_contacts.classList.add(
			'uk-grid', 
			'uk-grid-collapse', 
			'uk-child-width-1-2@s'
		);
		
		setTimeout(()=> {
			let contactName = log_contacts.getElementsByClassName('uk-form-label');
			for (let i=0; i < contactName.length; i++)
				contactName[i].classList.add('uk-text-truncate');
		}, 600);
		
		let submit = form.querySelector('a[title="Save Log"]');
		submit.classList.add(
			'uk-button', 
			'uk-button-primary', 
			'uk-button-large'
		);
		
		
		/**
		 * @desc New log progress control
		 */
		let progressList = progress.querySelector('ul');
		progressList.classList.add('uk-iconnav', 'uk-child-width-expand');
		
		if (typeof(progress2) !== 'undefined' && progress2 !== null) {
			let progressParentList = progressParent.querySelector('ul');
			progressParentList.classList.add('uk-iconnav', 'uk-child-width-expand');
		}
		
		
		/**
		 * @desc add modal close btn
		 */
		let logClose = document.createElement('button');
		logClose.classList.add('uk-modal-close-full', 'uk-close-large', 'uk-close', 'uk-icon', 'uk-padding-small', 'uk-animation-fade');
		logClose.setAttribute('type', 'button');
		logClose.setAttribute('uk-close', '');
		
		form.querySelector('.info-wrapper').appendChild(logClose);
		
		logClose.addEventListener('click', ()=> {
			document.body.classList.remove('no-scroll');
			form.classList.remove('uk-open');
			form.classList.add('skynet-modal-closed');
			setTimeout(()=> { form.classList.add('skynet-modal-closed'); }, 300);
		});
		
		
		/**
		 * @desc turn contacts into uk-accordion
		 */
		let contacts = log_contacts.querySelector('.contact-list');
		contacts.classList.add('uk-accordion');
		contacts.setAttribute('uk-accordion', '');
		
		// -- add accordion classes
		let contact = log_contacts.querySelectorAll('.group');
		for (let i=0; i < contact.length; i++) {
			contact[i].classList.add('uk-background-muted');
			contact[i].querySelector('div').classList.add('uk-accordion-title');
			contact[i].querySelector('ul').classList.add('uk-accordion-content', 'uk-grid', 'uk-grid-collapse', 'uk-child-width-1-2@s', 'uk-padding-small');
			contact[i].querySelector('ul').setAttribute('uk-grid', '');
		}
		
		// -- hide empty contact groups
		// setTimeout(()=> {
		// 	for (let i=0; i < contact.length; i++) {
		// 		let emptyContact = contact[i].querySelectorAll('li');
		// 		if (emptyContact === null) {
		// 			this.parentNode.parentNode.style.display = 'none';
		// 		}
		// 	}
		// }, 800);
		/**
		 * @desc hide empty contact groups
		 * @todo convert to vanilla javascript 
		 * {@link https://stackoverflow.com/a/22782542/8296677}
		 */
		$('#log-contacts').find('ul').each(function(){
		   var txt = $("li", this).text();
		   if(txt.length <= 0){
		      $(this).hide();
			  $(this).parent().addClass('empty');
		   }
		});
		
		
		/**
		 * @desc clear all inline styles
		 * {@link https://stackoverflow.com/a/25904055/8296677}
		 */
		let divs = form.querySelectorAll('*');
		Array.prototype.forEach.call(divs, (element)=> {
		    element.removeAttribute('style');
		});
		
		
		/**
		 * @desc remove all instances of .field;
		 */
		let field = form.getElementsByClassName('field');
		for (let elem = 0; elem < field.length; elem++) {
			field = field[elem];
			field.classList.remove('field');
		}
		
		
		// /**
		//  * add ukkit classes to all fieldset elems
		//  */
		// let fieldset = form.getElementsByTagName('fieldset');
		// for (let elem = 0; elem < fieldset.length; elem++) {
		// 	fieldset = fieldset[elem];
		// 	fieldset.classList.add('uk-fieldset');
		// }
		
		
		// /**
		//  * add ukkit classes to all label elems
		//  */
		// let label = form.getElementsByTagName('label');
		// for (let elem = 0; elem < label.length; elem++) {
		// 	label = label[elem];
		// 	label.classList.add('uk-form-label', 'uk-light');
		// }
		
		
		// /**
		//  * add ukkit classes to all input elems
		//  */
		// let input = form.getElementsByTagName('input[type="text"]');
		// for (let elem = 0; elem < input.length; elem++) {
		// 	input = input[elem];
		// 	input.classList.add('uk-input');
		// }
	}
})();



/**
 * @name searchConsole
 * @description Search console controls and tweaks.
 * @memberof pageSpecifics
 * @memberof liveResults
 */
(()=> {
	let element = document.querySelector('.search-form');
	if (typeof(element) !== 'undefined' && element !== null) {
		
		/**
		 * @desc Add .uk-* classes to search wrappers.
		 */
		let searchForm = document.querySelector('.search-form');
		searchForm.classList.add(
			'uk-card', 
			'uk-card-default', 
			// 'uk-card-small', 
			'uk-card-body'
		);
		
		// let console = document.querySelector('.search-console');
		// console.classList.add('uk-section-small');
		
		let search = document.querySelector('.basic-search');
		// search.classList.add('uk-container');
		
		
		/**
		 * @desc Add uk-* form classes to search elems
		 */
		let client_name = search.querySelector('#client_name');
		if (typeof(client_name) !== 'undefined' && client_name !== null)
			client_name.classList.add('uk-input', 'uk-width-1-4@m', 'uk-margin-small-bottom');
		
		let project_search = search.querySelector('#project-search');
		if (typeof(project_search) !== 'undefined' && project_search !== null) {
			project_search.classList.remove('form-item');
			project_search.classList.add('uk-select', 'uk-width-1-4@m', 'uk-margin-small-bottom');
		}
		
		let select_formItem = search.querySelector('select.form-item');
		if (typeof(select_formItem) !== 'undefined' && select_formItem !== null) {
			select_formItem.classList.add('uk-select', 'uk-width-1-4@m', 'uk-margin-small-bottom');
			select_formItem.classList.remove('form-item');
		}
		
		
		/**
		 * @desc Add and remove classes from search form buttons
		 */
		let submit = search.querySelector('input[type="submit"]');
		if (typeof(submit) !== 'undefined' && submit !== null) {
			submit.classList.add(
				'uk-button', 
				'uk-button-primary', 
				'uk-button-small'
			);
			submit.classList.remove('button-bg');
		}
		
		let clear = search.querySelector('input[value="Clear"]');
		if (typeof(clear) !== 'undefined' && clear !== null) {
			clear.classList.add(
				'uk-button', 
				'uk-button-default', 
				'uk-button-small',
				'uk-float-right'
			);
			clear.classList.remove('button-bg');
		}
	}
})();



/**
 * @name metaReponsive
 * @description Add reposive meta tag to document.head;
 */
(()=> {
	let title = document.head.getElementsByTagName('title')[0];
	let meta = document.createElement('meta');
	
	meta.setAttribute('name', 'viewport');
	meta.setAttribute('content', 'width=device-width, initial-scale=1, shrink-to-fit=no');
	
	document.head.insertBefore(meta, title);
})();



/**
 * @name breadcrumbs
 * @description Control project breadcrumbs nav.
 * @memberof pageSpecifics
 * @memberof taskLogs
 */
(()=> {
	let element = document.getElementById('breadcrumbs');
	if (typeof(element) !== 'undefined' && element !== null) {
		let crumbs = document.getElementById('breadcrumbs');
		
		crumbs.classList.add('uk-card', 'uk-card-default', 'uk-card-small', 'uk-card-body', 'uk-margin');
		document.getElementById('inner-wrapper').classList.add('uk-padding');
	}
})();



/**
 * @todo Figure out where this ID is, lol ...
 * @name openTicket
 * @memberof pageSpecifics
 * @memberof ??
 */
(()=> {
	let element = document.getElementById('open-ticket-wrapper');
	if (typeof(element) !== 'undefined' && element !== null) {
		element.classList.add(
			'uk-card', 
			'uk-card-default', 
			'uk-card-small', 
			'uk-card-body', 
			'uk-padding',
			'uk-margin'
		);
	}
})();



/**
 * @name sidebarNavigation
 * @description Sidebar navigation using UIkit's .uk-offcanvas;
 * @group globalElements
 */
(()=> {
	let element = document.getElementById('navigation');
	if (typeof(element) !== 'undefined' && element !== null) {
		let nav = document.getElementById('navigation');
		nav.classList.add('uk-offcanvas');
		nav.setAttribute('uk-offcanvas', 'mode: slide; overlay: true;');
		
		let list = nav.getElementsByTagName('ul');
		for (let i=0; i < list.length; i++) {
			list[i].classList.add('uk-nav-default', 'uk-nav-parent-icon', 'uk-nav');
			list[i].setAttribute('uk-nav', '');
		}
				
		let link = nav.getElementsByTagName('a');
		for (let i=0; i < link.length; i++)
			link[i].classList.add('skynet-offcanvas-link');
		
		let primary = document.getElementById('primary');
		primary.classList.add('uk-offcanvas-bar', 'uk-padding-remove');
		
		let to_do = primary.querySelector('li:first-child > a');
		to_do.parentNode.id = 'sidebar_myTasks';
		to_do.parentNode.classList.add('uk-animation-fade');
		
		let team = primary.querySelector('li:nth-child(2) > a');
		team.parentNode.id = 'sidebar_team';
		team.parentNode.classList.add('uk-animation-fade');
		
		let traffic = primary.querySelector('li:nth-child(3) > a');
		traffic.parentNode.id = 'sidebar_traffic';
		traffic.parentNode.classList.add('uk-animation-fade');
		
		let projects = primary.querySelector('li:nth-child(4) > a');
		projects.parentNode.id = 'sidebar_projects';
		projects.parentNode.classList.add('uk-animation-fade');
		
		let tasks = primary.querySelector('li:nth-child(5) > a');
		tasks.parentNode.id = 'sidebar_allTasks';
		tasks.parentNode.classList.add('uk-animation-fade');
		
		let clients = primary.querySelector('li:nth-child(6) > a');
		clients.parentNode.id = 'sidebar_clients';
		clients.parentNode.classList.add('uk-animation-fade');
		
		// change "To Do" to "My Tasks"
		to_do.innerHTML = 'My Tasks';
		
		// grab value of #username and apply it to top <li> item
		setTimeout(()=> {
			let name = document.getElementById('username');
			username.style.display = 'none';
			name.innerHTML = name.innerHTML.replace('Logged in as ', `<span class="uk-text-meta">Logged in as</span>`);
			let value = name.innerHTML;
			
			let listItem = document.createElement('li');
			listItem.innerHTML = `<div id="active-user">${value}</div>`;
			
			let primary = document.getElementById('primary');
			let to_do = primary.querySelector('li:first-child > a');
			primary.prepend(listItem);
		}, 600);
		
		let to_do_icon = document.createElement('i');
		to_do_icon.innerHTML = 'playlist_add_check';
		to_do_icon.classList.add('material-icons');
		to_do.appendChild(to_do_icon);
		
		let team_icon = document.createElement('i');
		team_icon.innerHTML = 'supervisor_account';
		team_icon.classList.add('material-icons');
		team.appendChild(team_icon);
		
		let traffic_icon = document.createElement('i');
		traffic_icon.innerHTML = 'compare_arrows';
		traffic_icon.classList.add('material-icons');
		traffic.appendChild(traffic_icon);
		
		let projects_icon = document.createElement('i');
		projects_icon.innerHTML = 'business_center';
		projects_icon.classList.add('material-icons');
		projects.appendChild(projects_icon);
		
		let tasks_icon = document.createElement('i');
		tasks_icon.innerHTML = 'list';
		tasks_icon.classList.add('material-icons');
		tasks.appendChild(tasks_icon);
		
		let clients_icon = document.createElement('i');
		clients_icon.innerHTML = 'folder_shared';
		clients_icon.classList.add('material-icons');
		clients.appendChild(clients_icon);
		
		// create account admin link
		let account = document.createElement('li');
		account.id = 'sidebar_account';
		account.classList.add('uk-animation-fade');
		account.innerHTML = `
			<a class="skynet-offcanvas-link" id="account">
        		Account
        		<i class="material-icons">account_circle</i>
        	</a>
		`;
		primary.appendChild(account);
		
		// -- extract href from a[title="Account Admin"] and apply it to account admin link
		setTimeout(()=> {
			let admin = document.querySelector('a[title="Account Admin"]');
			admin.style.display = 'none';
			let link = admin.href;
			document.getElementById('account').href = link;
		}, 300);
	}
})();



/**
 * @name headerBranding
 * @description Header #branding elem styles and tweaks.
 * @group globalElements
 */
(()=> {
	let element = document.getElementById('branding');
	if (typeof(element) !== 'undefined' && element !== null && document.body.id != 'login') {
		let branding	= document.getElementById('branding');
		let list		= branding.getElementsByTagName('ul')[0];
		let header		= branding.getElementsByTagName('div')[0];
		let resBlock	= branding.querySelector('.resources ul');
		let loggedIn	= branding.querySelector('.loggedinas li:first-child');
		let name		= document.getElementById('name-filter');
		let time		= document.getElementById('time-logged');
		let	byFilter	= document.getElementById('to-by-filter');
		
		branding.classList.add(
			'uk-navbar', 
			'uk-navbar-nav', 
			'uk-navbar-container', 
			'uk-navbar-transparent', 
			'uk-background-primary', 
			'uk-light',
			'uk-flex-row-reverse'
		);
		list.classList.add('uk-navbar-left', 'uk-navbar-nav', 'uk-list', 'uk-margin-remove');
		resBlock.style.display = 'none';
		loggedIn.classList.add('uk-navbar-item');
		loggedIn.id = 'username';
		
		if (typeof(time) !== 'undefined' && time !== null)
			time.classList.add('uk-text-meta');
		
		if (typeof(byFilter) !== 'undefined' && byFilter !== null)
			byFilter.style.display = 'none';
		
		if (typeof(name) !== 'undefined' && name !== null)
			name.classList.add('uk-navbar-right', 'uk-navbar-item', 'uk-text-right');
		
		// branding.classList.add('uk-modal', 'uk-flex', 'uk-flex-column-reverse', 'uk-flex-nowrap', 'uk-flex-align-start', 'skynet-modal-closed');
		// branding.setAttribute('uk-modal', '');
		// list.classList.add('uk-modal-dialog', 'uk-modal-body', 'uk-overflow-auto');
		
		// if (typeof(header) !== 'undefined' && element !== null)
		// 	header.classList.add('uk-modal-dialog', 'uk-modal-header');
		
		// let close = document.createElement('button');
		// close.classList.add('uk-modal-close-default', 'uk-close', 'uk-icon', 'uk-padding-small', 'uk-animation-fade');
		// close.setAttribute('type', 'button');
		// close.setAttribute('uk-close', '');
		// close.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" ratio="1"><line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"></line><line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"></line></svg>`;
		// // branding.insertBefore(close, list);
		// list.appendChild(close);
		// close.addEventListener('click', ()=> {
		// 	document.body.classList.remove('no-scroll');
		// 	branding.classList.remove('uk-open');
		// 	setTimeout(()=> { branding.classList.add('skynet-modal-closed'); }, 300);
		// });
		
		// let open = document.createElement('header');
		// open.id = 'navbar';
		// // open.classList.add('uk-sticky', 'uk-active', 'uk-sticky-below', 'uk-sticky-fixed', 'uk-box-shadow-medium');
		// // open.setAttribute('uk-sticky', 'top: 100; animation: uk-animation-slide-top; bottom: #sticky-on-scroll-up;');
		// open.innerHTML = `
		// 	<nav class="uk-navbar uk-navbar-container">
  //  			<div class="uk-navbar-right">
  //      			<a class="uk-navbar-toggle" uk-toggle uk-navbar-toggle-icon href="#branding"></a>
  //  			</div>
		// 	</nav>
		// `;
		// let wrapper = document.getElementById('wrapper');
		// document.body.insertBefore(open, wrapper);
		// open.addEventListener('click', ()=> {
		// 	document.body.classList.add('no-scroll');
		// 	branding.classList.remove('skynet-modal-closed');
		// 	branding.classList.add('uk-open');
		// });
	}
})();



/**
 * @name loginPage
 * @description Login page attributes, styles, and tweaks.
 * @memberof pageSpecifics
 */
(()=> {
	let element = document.getElementById('headlines');
	if (typeof(element) !== 'undefined' && element !== null) {
		let headlines = document.getElementById('headlines');
		
		headlines.classList.add('uk-section', 'uk-text-center');
		headlines.parentNode.classList.add('uk-background-primary', 'uk-margin-large-bottom');
		headlines.querySelector('span').classList.add('uk-text-lead', 'uk-light');
	}
})();



/**
 * @name clientTemperatures
 * @description Client temperatures (project status overview) styles and tweaks.
 * @memberof pageSpecifics
 */
(()=> {
	let element = document.getElementById('temperatures');
	if (typeof(element) !== 'undefined' && element !== null) {
		let wrapper			= document.getElementById('temperature-wrapper');
		let temperatures	= document.getElementById('temperatures');
		let controller		= document.getElementById('temp-bar');
		let open			= controller.querySelectorAll('p')[0];
		let title			= temperatures.getElementsByClassName('temp-title');
		let client			= temperatures.querySelectorAll('ul > li');
		let animation		= 'uk-animation-slide-left-small';
		
		// tweaks some elems
		controller.querySelectorAll('p')[1].remove();
		temperatures.style.display = 'none';
		open.style.backgroundColor = '#ddd';
		open.innerHTML = 'Client Temperatures';
		
		// add some classes
		// wrapper.classList.add('uk-margin-bottom');
		temperatures.classList.add('uk-background-secondary', 'uk-padding-small', 'uk-text-meta', 'uk-light', 'uk-grid', 'uk-grid-collapse', 'uk-child-width-1-3@s');
		temperatures.setAttribute('uk-grid', '');
		open.classList.add('uk-padding-small', 'uk-accordion-title', 'uk-text-meta', 'uk-dark', 'uk-margin-remove');
		for (let i=0; i < title.length; i++) {
			title[i].classList.add(animation);
			title[i].parentNode.classList.add('uk-list', 'uk-list-divider', 'uk-margin-small-bottom');
		}
		for (let i=0; i < client.length; i++)
			client[i].classList.add(animation);
	}
})();



/**
 * @name applyClasses
 * @description Apply .uk-* classes across a plethora of default elements.
 * @group globalElements
 */
(()=> {
	const anim_delay	= 'animation-delay-default';
	const anim_btmSmall = 'uk-animation-slide-bottom-small';
	
	
	/**
	 * Add .uk-margin classes
	 * @var field = <element class="field" />
	 * @var field = <element class="buttons" />
	 */
	let field = document.getElementsByClassName('field');
	for (let i = 0; i < field.length; i++)
		field[i].classList.add('uk-margin');
	
	let buttons = document.getElementsByClassName('buttons');
	for (let i = 0; i < buttons.length; i++)
		buttons[i].classList.add('uk-margin');
	
	
	/**
	 * Add .uk-form-label classes
	 * @var label = <label />
	 */
	let formLabel = document.querySelectorAll('form label');
	for (let i = 0; i < formLabel.length; i++)
		formLabel[i].classList.add('uk-form-label');
		
		
	/**
	 * Add .uk-input classes
	 * @var input = <input type="text" />
	 */
	let input = document.querySelectorAll('input[type="text"]');
	for (let i = 0; i < input.length; i++)
		input[i].classList.add('uk-input');
			
			
	/**
	 * Add .uk-input classes
	 * @var input = <input type="text" />
	 */
	let pass = document.querySelectorAll('input[type="password"]');
	for (let i = 0; i < pass.length; i++)
		pass[i].classList.add('uk-input');
	
	
	/**
	 * Add .uk-checkbox classes
	 * @var checkbox = <input type="checkbox" />
	 */
	let checkbox = document.querySelectorAll('input[type="checkbox"]');
	for (let i = 0; i < checkbox.length; i++)
		checkbox[i].classList.add('uk-checkbox');


	/**
	 * Add .uk-radio classes
	 * 
	 * @var radio = <input type="radio" />
	 */
	let radio = document.querySelectorAll('input[type="radio"]');
	for (let i = 0; i < radio.length; i++)
		radio[i].classList.add('uk-radio');


	/**
	 * Add .uk-fieldset classes
	 * 
	 * @var radio = <fieldset />
	 */
	let fieldset = document.querySelectorAll('fieldset');
	for (let i = 0; i < fieldset.length; i++)
		fieldset[i].classList.add('uk-fieldset');


	/**
	 * Add .uk-select classes
	 * 
	 * @var radio = <input type="select" />
	 */
	let select = document.getElementsByTagName('select');
	for (let i = 0; i < select.length; i++)
		select[i].classList.add('uk-select');
	
	
	/**
	 * Add .uk-container classes
	 * 
	 * @var formValidate = <form class="validate" />
	 */
	let formValidate = document.getElementsByClassName('validate');
	for (let i = 0; i < formValidate.length; i++)
		formValidate[i].classList.add('uk-container');
	
	
	/**
	 * Add .uk-button classes
	 * 
	 * @var submit = <input type="submit" />
	 * @var reset = <input type="reset" />
	 */
	let submit = document.querySelectorAll('input[type="submit"]');
	for (let i = 0; i < submit.length; i++)
		submit[i].classList.add('uk-button', 'uk-button-primary');

	let reset = document.querySelectorAll('input[type="reset"]');
	for (let i = 0; i < reset.length; i++)
		reset[i].classList.add('uk-button', 'uk-button-default');


	/**
	 * Add .uk-label classes
	 * 
	 * @var spanLabel = <span class="label" />
	 * @var labelNew = <span class="new-reply" />
	 * @var labelUpdated = <span class="updated" />
	 */
	let spanLabel		= document.getElementsByClassName('label');
	let labelNew		= document.getElementsByClassName('new-reply');
	let labelUpdated	= document.getElementsByClassName('updated');
	
	for (let i = 0; i < spanLabel.length; i++)
		spanLabel[i].classList.add('uk-label');

	for (let i = 0; i < labelNew.length; i++)
		labelNew[i].classList.add('uk-label-success');

	for (let i = 0; i < labelUpdated.length; i++)
		labelUpdated[i].classList.add('uk-label-warning');
	
	
	/**
	 * clear all inline styles
	 * 
	 * @link https://stackoverflow.com/a/25904055/8296677
	 */
	let tds = document.getElementsByTagName('td');
	Array.prototype.forEach.call(tds, (element)=> {
	    element.removeAttribute('width');
	});
	
	let trs = document.getElementsByTagName('tr');
	Array.prototype.forEach.call(trs, (element)=> {
	    element.removeAttribute('style');
	});
	
	
	/**
	 * Add .uk-progress classes
	 */
	let progress = document.querySelectorAll('progress');
	for (let i = 0; i < progress.length; i++)
		progress[i].classList.add('uk-progress');
})();



/**
 * @name resourcesList
 * @description Custom resources list in JSON.
 * @group globalElements
 * {@link https://stackoverflow.com/a/8963716/8296677}
 */
(()=> {
	let element = document.getElementById('branding');
	if (typeof(element) !== 'undefined' && element !== null && document.body.id != 'login') {
		
		
		// -- define resources list items
		const resources = [
			{
				id: 00, 
				name:	'Browserstack', 
				// logo:	'https://media.glassdoor.com/sqll/894257/browserstack-squarelogo-1463751505724.png', 
				url:	'http://www.browserstack.com', 
				description: 'Live, web-based browser testing; instant access to all real mobile and desktop browsers. Say goodbye to your lab of devices and virtual machines.'
			},
			{
				id: 01, 
				name: 'Catalyst Lab', 
				url: 'http://patterns.dev.sabrehospitality.com/',
				description: 'Collection of home-brewed SHS web components.'
			},
			{ id: 02, name: 'Central Data Collection', url: 'http://cdc.esiteportal.com/admin/login.php' },
			// { id: 03, name: 'Catalyst Lab', url: 'http://patterns.dev.sabrehospitality.com/' },
			{ id: 04, name: 'Clone CMT', url: 'http://context.sabredemos.com/client/login.php' },
			{
				id: 05, 
				name: 'Cloudforge SVN', 
				url: 'https://app.cloudforge.com/',
				description: 'Subversion (SVN) repository hosting.'
			},
			{ id: 06, name: 'DotP', url: 'http://skynet.esiteportal.com/dotp/index.php' },
			{
				id: 07, 
				name: 'InVision', 
				url: 'https://projects.invisionapp.com',
				description: 'InVision allows you to quickly create interactive clickable prototypes and gather instant feedback from your users/stakeholders.'
			},
			{
				id: 08, 
				name: 'Knowledge Foundation Center', 
				url: 'http://skynet.esiteportal.com/kfc-remote-login.php',
				description: '\"Question and Answer\" site that is free to use. You may come here to ask a question, put a solution to a problem someone has, or just browse around for a topic that may interest you.'
			},
			{
				id: 09, 
				name: 'Kronos', 
				url: 'https://sabre.kronos.net/',
				description: 'Kronos\® simplifies the tedious tasks involved with monitoring employee time and attendance, labor tracking, and data collection.'
			},
			{
				id: 10, 
				name: 'MyCareer', 
				url: 'http://mycareer.sabre.com',
				description: 'The Sabre MyCareer tool is a portal for all your SHS-related needs.'
			},
			{
				id: 11, 
				name: 'DMS Portal', 
				url: 'http://dmsportal.sabrehospitality.com/',
				description: 'One-stop-shop for all DMS stuff.'
			},
			{ id: 12, name: 'eSite Portal', url: 'http://www.esiteportal.com/index.php?SECTION=login' },
			{ id: 13, name: 'Profit Center', url: 'http://skynet.esiteportal.com/PPC/login.php' },
			{ id: 14, name: 'Sabre Benefits Portal', url: 'https://ess5.empyreanbenefitsolutions.com/sabre/security/login' },
			{
				id: 15, 
				name: 'SHS Wiki', 
				url: 'http://wiki.esitelabs.com:1081/index.php/Main_Page',
				description: 'Looking for something? You\'ll probably find information about it here.'
			},
			{ id: 16, name: 'SHS User Admin', url: 'https://shsuseradmin.sabrehospitality.com/' },
			{
				id: 17, 
				name: 'Shutterstock', 
				url: 'http://www.shutterstock.com/',
				description: 'Search millions of royalty-free stock photos, illustrations, and vectors. Get inspired by ten thousand new, high-resolution images added daily.'
			},
			{ id: 18, name: 'Swamp (MCC/CMT)', url: 'http://esiteinteractive.com/swamp/login.php' },
			{
				id: 19, 
				name: 'Teamphoria', 
				url: 'https://shs.teamphoria.com/',
				description: 'Teamphoria is the employee engagement software you need to amplify your team’s energy and increase company revenue.'
			},
		];
		
		
		// -- hide old resources button
		document.getElementById('branding').querySelector('li:nth-child(3)').style.display = 'none';
		
		
		// -- create new resources sidebar button
		let newButton = document.createElement('li');
		newButton.id = 'sidebar_resources';
		newButton.classList.add('uk-animation-fade');
		newButton.innerHTML = `
			<a id="resources" href="#modal-resources" class="skynet-offcanvas-link" uk-toggle>
	    		Resources
	    		<i class="material-icons">info</i>
	    	</a>
		`;
		// setTimeout(()=> {
			document.getElementById('primary').append(newButton);
		// }, 300);
		
		
		// -- create new modal for resource list
		let modal = document.createElement('article');
		modal.setAttribute('uk-modal', '');
		modal.id = 'modal-resources';
		modal.innerHTML = `
			<div class="uk-modal-dialog">
				<button class="uk-modal-close-default" type="button" uk-close></button>
				<header class="uk-modal-header">
					<h2 class="uk-modal-title">Resources</h2>
				</header>
				<div id="resourcesList" class="uk-modal-body uk-overflow-auto" uk-overflow-auto>
				</div>
				<footer class="uk-modal-footer uk-text-right">
					<button class="uk-button uk-button-default uk-modal-close" type="button">Close</button>
				</footer>
			</div>
			<script id="resourcesTemplate" type="x-template">
				<a class="resource-link" target="_blank">
					<div class="resource-info-wrapper">
						<p class="resource-name uk-margin-remove"></p>
						<h6 class="resource-description uk-text-meta uk-margin-remove no-content" />
					</div>
					<div class="resource-logo-wrapper no-content">
						<img class="resource-logo no-content" />
					</div>
				</a>
			</script>
		`;
		document.body.append(modal);
		
		
		// -- print every resource in resources to a list inside #modal-resources
		// -- forked https://codepen.io/eddyerburgh/pen/ONEQGr
		let template = document.getElementById('resourcesTemplate').innerHTML;
		
		let anchor = document.createElement('ul');
		anchor.classList.add('uk-list', 'uk-list-striped', 'uk-list-large');
		
		resources.forEach(function(resource) {
			let el = document.createElement('li');
			el.classList.add('resource-item');
			el.innerHTML = template;
			
			let empty = 'no-content';
				
				// -- resource.logo
				if (resource.logo) {
					el.getElementsByClassName('resource-logo')[0].setAttribute('src', resource.logo);
					el.getElementsByClassName('resource-logo')[0].classList.remove(empty);
					el.getElementsByClassName('resource-logo-wrapper')[0].classList.remove(empty);
				}
				
				// -- resource.name
				if (resource.name)
					el.getElementsByClassName('resource-name')[0].appendChild(document.createTextNode(resource.name));
				
				// -- resource.description
				if (resource.description) {
					el.getElementsByClassName('resource-description')[0].appendChild(document.createTextNode(resource.description));
					el.getElementsByClassName('resource-description')[0].classList.remove(empty);
				}
				
				// -- resource.url
				if (resource.url)
					el.getElementsByClassName('resource-link')[0].setAttribute('href', resource.url);
				else
					el.classList.add(empty);
				
			anchor.appendChild(el);
		});
		
		document.getElementById('resourcesList').appendChild(anchor);
	}
})();



/**
 * @name imageWrap
 * @description Control images inside task log comments.
 * @memberof taskLogs
 * @memberof pageSpecifics
 */
(()=> {
	let element = document.querySelector('.image-wrap');
	if (typeof(element) !== 'undefined' && element !== null) {
		let link = document.querySelectorAll('.image-wrap > a');
		for (let i=0; i < link.length; i++) {
			link[i].classList.add('uk-box-shadow-medium');
			link[i].style.display = 'inline-block';
			link[i].style.border = '1px solid #ddd';
			let value = link[i].href;
			link[i].querySelector('img').src = value;
		}
	}
})();



/**
 * @name fileUpload
 * @description Task attachment; file upload tweaks.
 * @memberof taskLogs
 * @memberof pageSpecifics
 */
setTimeout(()=> {
	let element = document.getElementById('fileupload');
	if (typeof(element) !== 'undefined' && element !== null) {
		
		
		/**
		 * Add .uk-card classes to #fileupload;
		 */
		element.classList.add(
			'uk-card', 
			'uk-card-default', 
			'uk-card-small', 
			'uk-card-body', 
			'uk-margin'
		);
		
		
		/**
		 * Add some flex props to the buttons and wrapper.
		 */
		let button_wrapper = element.querySelector('.fileupload-buttons');
		button_wrapper.classList.add('uk-iconnav', 'uk-flex-between@s');
		
		
		/**
		 * Add .uk-table classes to table.file-table;
		 */
		let fileTable = element.querySelector('.file-table');
		fileTable.classList.add(
			'uk-table', 
			'uk-table-striped', 
			'uk-table-middle', 
			'uk-table-small', 
			'uk-text-small',
			'uk-animation-fade'
		);
	}
}, 800);



/**
 * @name accountAdmin
 * @description Account Admin styles and tweaks.
 * @memberof pageSpecifics
 */
(()=> {
	let element = document.getElementById('custom-user-info');
	if (typeof(element) !== 'undefined' && element !== null) {
		let basic = document.getElementById('basic');
		basic.classList.add(
			'uk-card', 
			'uk-card-default', 
			'uk-card-small', 
			'uk-card-body', 
			'uk-margin'
		);
		
		let advanced = document.getElementById('advanced');
		advanced.classList.add('uk-card', 'uk-card-default', 'uk-card-small', 'uk-card-body', 'uk-margin');
		
		let availability = document.getElementById('availability');
		availability.classList.add('uk-card', 'uk-card-default', 'uk-card-small', 'uk-card-body', 'uk-margin');
		
		let pto = document.getElementById('pto');
		pto.classList.add('uk-card', 'uk-card-default', 'uk-card-small', 'uk-card-body', 'uk-margin');
		
		document.getElementById('customize-header').style.display = 'none';
		let user_block = document.querySelector('.user-block');
		user_block.classList.add('uk-card', 'uk-card-default', 'uk-card-small', 'uk-card-body', 'uk-margin');
		
		// swap
		let swapper = document.querySelector('.user-tabs');
		swapper.classList.add('uk-subnav', 'uk-subnav-pill');
		
		let myclients = document.getElementById('myclients');
		let clientsList = myclients.querySelector('ul');
		clientsList.classList.add('uk-list', 'uk-list-divider');
		
		// let myinterface = document.getElementById('myinterface');
		// myinterface.classList.add('uk-switcher', 'switcher-container');
	}
})();



/**
 * @name issuesLink
 * @description Attach a link to the Github issue tracker to the branding header.
 * @group globalElements
 */
(()=> {
	let element = document.getElementById('primary');
	if (typeof(element) !== 'undefined' && element !== null) {
		let issues = document.createElement('li');
		issues.id = 'sidebar_issues';
		issues.classList.add('uk-animation-fade');
		issues.innerHTML = `
			<a class="skynet-offcanvas-link" id="issues" href="https://github.com/williampansky/skynet.override/issues" target="_blank">
				Issue Tracker *
				<span uk-icon="icon: github"></span>
			</a>
		`;
		element.appendChild(issues);
	}
})();



/**
 * @name userSettings
 * @group globalElements
 */
(()=> {
	let element = document.getElementById('primary');
	if (typeof(element) !== 'undefined' && element !== null) {
		// -- define settings element
		let settings = document.createElement('li');
		settings.id = 'sidebar_settings';
		settings.classList.add('uk-animation-fade');
		settings.innerHTML = `
			<a class="skynet-offcanvas-link" id="settings" href="#settingsModal" uk-toggle>
				Settings
				<i class="material-icons">settings</i>
			</a>
		`;
		element.appendChild(settings);
		
		// -- outline dom model
		let settingsModal = document.createElement('div');
		settingsModal.innerHTML = `
			<div id="settingsModal" uk-modal>
				<article class="uk-modal-dialog">
					<button class="uk-modal-close-default" type="button" uk-close></button>
					<header class="uk-modal-header">
						<h2 class="uk-modal-title">SkyNet Settings</h2>
					</header>
					<div class="uk-modal-body" uk-overflow-auto>
			            <form id="skynetSettings">
			            	<!-- Sidebar Items -->
							<div class="uk-margin-large">
								<legend for="sidebarItems" class="uk-legend">Sidebar Items</legend>
								<div class="uk-form-controls uk-grid-small uk-child-width-auto uk-grid" uk-grid>
									<label for="sidebar_myTasks">
										<input type="checkbox" name="sidebar_myTasks" value="My Tasks" class="uk-checkbox" checked> 
										My Tasks
									</label>
									<label for="sidebar_team">
										<input type="checkbox" name="sidebar_team" value="Team" class="uk-checkbox" checked> 
										Team
									</label>
									<label for="sidebar_traffic">
										<input type="checkbox" name="sidebar_traffic" value="My Tasks" class="uk-checkbox" checked> 
										Traffic Manager
									</label>
									<label for="sidebar_projects">
										<input type="checkbox" name="sidebar_projects" value="Team" class="uk-checkbox" checked> 
										Projects
									</label>
									<label for="sidebar_allTasks">
										<input type="checkbox" name="sidebar_allTasks" value="My Tasks" class="uk-checkbox" checked> 
										Tasks
									</label>
									<label for="sidebar_clients">
										<input type="checkbox" name="sidebar_clients" value="Team" class="uk-checkbox" checked> 
										Clients
									</label>
									<label for="sidebar_account">
										<input type="checkbox" name="sidebar_account" value="My Tasks" class="uk-checkbox" checked> 
										Account
									</label>
									<label for="sidebar_resources">
										<input type="checkbox" name="sidebar_resources" value="Team" class="uk-checkbox" checked> 
										Resources
									</label>
									<label for="sidebar_issues">
										<input type="checkbox" name="sidebar_issues" value="My Tasks" class="uk-checkbox" checked> 
										Issue Tracker
									</label>
								</div>
							</div>
							
							<!-- Task List -->
							<div class="uk-margin-large">
								<legend for="taskList" class="uk-legend">Task List</legend>
								<div class="uk-form-controls uk-grid-small uk-child-width-auto uk-grid" uk-grid>
									<label for="links_newTab">
										<input type="checkbox" name="links_newTab" value="Open Links in New Tab" class="uk-checkbox"> 
										Open Links in New Tab
									</label>
								</div>
							</div>
							
							<!-- UI -->
							<div class="uk-margin-large">
								<legend for="ui" class="uk-legend">UI</legend>
								<div class="uk-form-controls uk-grid-small uk-child-width-auto uk-grid" uk-grid>
									<label for="ui_clientTemps">
										<input type="checkbox" name="ui_clientTemps" value="Display Client Temperatures" class="uk-checkbox" checked> 
										Display Client Temperatures
									</label>
									<label for="ui_searchForm">
										<input type="checkbox" name="ui_searchForm" value="Display Search Form" class="uk-checkbox" checked> 
										Display Search Form
									</label>
									<div data-for="tasks_sortTasks" class="uk-width-1-1">
										<label class="uk-form-label" for="tasks_sortTasks">Sort Tasks by</label>
								        <div class="uk-form-controls">
								            <select class="uk-select" name="tasks_sortTasks">
								                <option>Date (Overdue, Today, etc.)</option>
								                <option>Client (Alphabetical [Ascending])</option>
								                <option>Client (Alphabetical [Descending])</option>
								            </select>
								        </div>
								        <div class="uk-text-middle uk-text-meta uk-text-right uk-form-label uk-width-1-1">
								        	Note: Page will refresh on modal close.
							        	</div>
							        </div>
								</div>
							</div>
			            </form>
					</div>
					<footer class="uk-modal-footer uk-text-right">
						<button class="uk-button uk-button-default uk-modal-close" type="button">Close</button>
						<!-- <button class="uk-button uk-button-primary" type="button">Save</button> -->
					</footer>
				</article>
			</div>
		`;
		document.body.appendChild(settingsModal);
		
		// -- apply logic
		// -- wrapped in a minor timeout to make sure elements are there
		setTimeout(()=> {
			// -- sidebar items
			((sidebar_myTasks)=> {
				let element = document.getElementById('sidebar_myTasks');
				let trigger = document.querySelector('input[name="sidebar_myTasks"]');
				
				trigger.addEventListener('click', ()=> {
					if (trigger.checked !== true) {
						element.style.display = 'none';
						localStorage.setItem('sidebar_myTasks', 'display-none');
					} else {
						element.style.display = 'list-item';
						localStorage.removeItem('sidebar_myTasks');
					}
				});
				
				// -- read and apply localStorage logic
				let setting = localStorage.getItem('sidebar_myTasks');
				if (setting === 'display-none') {
					element.style.display = 'none';
					trigger.removeAttribute('checked');
				}
			})();
			((sidebar_team)=> {
				let element = document.getElementById('sidebar_team');
				let trigger = document.querySelector('input[name="sidebar_team"]');
				
				trigger.addEventListener('click', ()=> {
					if (trigger.checked !== true) {
						element.style.display = 'none';
						localStorage.setItem('sidebar_team', 'display-none');
					} else {
						element.style.display = 'list-item';
						localStorage.removeItem('sidebar_team');
					}
				});
				
				// -- read and apply localStorage logic
				let setting = localStorage.getItem('sidebar_team');
				if (setting === 'display-none') {
					element.style.display = 'none';
					trigger.removeAttribute('checked');
				}
			})();
			((sidebar_traffic)=> {
				let element = document.getElementById('sidebar_traffic');
				let trigger = document.querySelector('input[name="sidebar_traffic"]');
				
				trigger.addEventListener('click', ()=> {
					if (trigger.checked !== true) {
						element.style.display = 'none';
						localStorage.setItem('sidebar_traffic', 'display-none');
					} else {
						element.style.display = 'list-item';
						localStorage.removeItem('sidebar_traffic');
					}
				});
				
				// -- read and apply localStorage logic
				let setting = localStorage.getItem('sidebar_traffic');
				if (setting === 'display-none') {
					element.style.display = 'none';
					trigger.removeAttribute('checked');
				}
			})();
			((sidebar_projects)=> {
				let element = document.getElementById('sidebar_projects');
				let trigger = document.querySelector('input[name="sidebar_projects"]');
				
				trigger.addEventListener('click', ()=> {
					if (trigger.checked !== true) {
						element.style.display = 'none';
						localStorage.setItem('sidebar_projects', 'display-none');
					} else {
						element.style.display = 'list-item';
						localStorage.removeItem('sidebar_projects');
					}
				});
				
				// -- read and apply localStorage logic
				let setting = localStorage.getItem('sidebar_projects');
				if (setting === 'display-none') {
					element.style.display = 'none';
					trigger.removeAttribute('checked');
				}
			})();
			((sidebar_allTasks)=> {
				let element = document.getElementById('sidebar_allTasks');
				let trigger = document.querySelector('input[name="sidebar_allTasks"]');
				
				trigger.addEventListener('click', ()=> {
					if (trigger.checked !== true) {
						element.style.display = 'none';
						localStorage.setItem('sidebar_allTasks', 'display-none');
					} else {
						element.style.display = 'list-item';
						localStorage.removeItem('sidebar_allTasks');
					}
				});
				
				// -- read and apply localStorage logic
				let setting = localStorage.getItem('sidebar_allTasks');
				if (setting === 'display-none') {
					element.style.display = 'none';
					trigger.removeAttribute('checked');
				}
			})();
			((sidebar_clients)=> {
				let element = document.getElementById('sidebar_clients');
				let trigger = document.querySelector('input[name="sidebar_clients"]');
				
				trigger.addEventListener('click', ()=> {
					if (trigger.checked !== true) {
						element.style.display = 'none';
						localStorage.setItem('sidebar_clients', 'display-none');
					} else {
						element.style.display = 'list-item';
						localStorage.removeItem('sidebar_clients');
					}
				});
				
				// -- read and apply localStorage logic
				let setting = localStorage.getItem('sidebar_clients');
				if (setting === 'display-none') {
					element.style.display = 'none';
					trigger.removeAttribute('checked');
				}
			})();
			((sidebar_account)=> {
				let element = document.getElementById('sidebar_account');
				let trigger = document.querySelector('input[name="sidebar_account"]');
				
				trigger.addEventListener('click', ()=> {
					if (trigger.checked !== true) {
						element.style.display = 'none';
						localStorage.setItem('sidebar_account', 'display-none');
					} else {
						element.style.display = 'list-item';
						localStorage.removeItem('sidebar_account');
					}
				});
				
				// -- read and apply localStorage logic
				let setting = localStorage.getItem('sidebar_account');
				if (setting === 'display-none') {
					element.style.display = 'none';
					trigger.removeAttribute('checked');
				}
			})();
			((sidebar_resources)=> {
				let element = document.getElementById('sidebar_resources');
				let trigger = document.querySelector('input[name="sidebar_resources"]');
				
				trigger.addEventListener('click', ()=> {
					if (trigger.checked !== true) {
						element.style.display = 'none';
						localStorage.setItem('sidebar_resources', 'display-none');
					} else {
						element.style.display = 'list-item';
						localStorage.removeItem('sidebar_resources');
					}
				});
				
				// -- read and apply localStorage logic
				let setting = localStorage.getItem('sidebar_resources');
				if (setting === 'display-none') {
					element.style.display = 'none';
					trigger.removeAttribute('checked');
				}
			})();
			((sidebar_issues)=> {
				let element = document.getElementById('sidebar_issues');
				let trigger = document.querySelector('input[name="sidebar_issues"]');
				
				trigger.addEventListener('click', ()=> {
					if (trigger.checked !== true) {
						element.style.display = 'none';
						localStorage.setItem('sidebar_issues', 'display-none');
					} else {
						element.style.display = 'list-item';
						localStorage.removeItem('sidebar_issues');
					}
				});
				
				// -- read and apply localStorage logic
				let setting = localStorage.getItem('sidebar_issues');
				if (setting === 'display-none') {
					element.style.display = 'none';
					trigger.removeAttribute('checked');
				}
			})();
			
			// -- task list
			((links_newTab)=> {
				let elements = document.querySelectorAll('.bs-component a[target="_blank"]');
				let trigger = document.querySelector('input[name="links_newTab"]');
				
				trigger.addEventListener('click', ()=> {
					if (trigger.checked === true) {
						localStorage.setItem('links_newTab', 'true');
						for (let i = 0; i < elements.length; i++) {
							elements[i].setAttribute('target', '_blank');
							trigger.setAttribute('checked');
						}
					} else {
						localStorage.removeItem('links_newTab');
						for (let i = 0; i < elements.length; i++) {
							elements[i].removeAttribute('target');
							trigger.removeAttribute('checked');
						}
					}
				});
				
				// -- read and apply localStorage logic
				let setting = localStorage.getItem('links_newTab');
				if (setting === 'true') {
					for (let i = 0; i < elements.length; i++) {
						elements[i].setAttribute('target', '_blank');
						trigger.removeAttribute('checked');
					}
				}
			})();
			((tasks_sortTasks)=> {
				let element = document.querySelector('#sidebar_myTasks a');
				let href	= element.href;
				let trigger = document.querySelector('select[name="tasks_sortTasks"]');
				
				trigger.addEventListener('change', (e)=> {
					console.log('[Settings] Display Tasks by: ', this.value);
				}, false);
				
				// let displayBy = trigger.value;
			 //   if (displayBy == 'Date (Overdue, Today, etc.)') {
			 //   	localStorage.removeItem('sortTasks');
			 //   } else if (displayBy == 'Client (Alphabetical [Ascending])') {
			 //   	localStorage.setItem('sortTasks', 'asc');
			 //   } else if (displayBy == 'Client (Alphabetical [Descending])') {
			 //   	localStorage.setItem('sortTasks', 'desc');
			 //   }
				
				// -- read and apply localStorage logic
				// let setting = localStorage.getItem('tasks_sortTasks');
				// if (setting === 'display-none') {
				// 	element.style.display = 'none';
				// 	trigger.removeAttribute('checked');
				// }
			})();
			
			// -- ui
			((ui_searchForm)=> {
				let element = document.querySelector('form[name="search-form"]');
				let trigger = document.querySelector('input[name="ui_searchForm"]');
				
				trigger.addEventListener('click', ()=> {
					if (trigger.checked !== true) {
						if (typeof(element) !== 'undefined' && element !== null)
							element.style.display = 'none';
						localStorage.setItem('ui_searchForm', 'display-none');
					} else {
						if (typeof(element) !== 'undefined' && element !== null)
							element.style.display = 'list-item';
						localStorage.removeItem('ui_searchForm');
					}
				});
				
				// -- read and apply localStorage logic
				let setting = localStorage.getItem('ui_searchForm');
				if (setting === 'display-none') {
					if (typeof(element) !== 'undefined' && element !== null)
						element.style.display = 'none';
					trigger.removeAttribute('checked');
				}
			})();
			((ui_clientTemps)=> {
				let element = document.getElementById('temperature-wrapper');
				let trigger = document.querySelector('input[name="ui_clientTemps"]');
				
				trigger.addEventListener('click', ()=> {
					if (trigger.checked !== true) {
						if (typeof(element) !== 'undefined' && element !== null)
							element.style.display = 'none';
						localStorage.setItem('ui_clientTemps', 'display-none');
					} else {
						if (typeof(element) !== 'undefined' && element !== null)
							element.style.display = 'list-item';
						localStorage.removeItem('ui_clientTemps');
					}
				});
				
				// -- read and apply localStorage logic
				let setting = localStorage.getItem('ui_clientTemps');
				if (setting === 'display-none') {
					if (typeof(element) !== 'undefined' && element !== null)
						element.style.display = 'none';
					trigger.removeAttribute('checked');
				}
			})();
		}, 300);
	}
})();



/**
 * @function applyFrameworkStyles
 * @description Type your description here.
 * @memberof functions
 * @param {String} Type A declaration of the component to convert to.
 * @param {String} Selector The DOM element to apply the conversion.
*/
function applyFrameworkStyles(type, selector, additionalClasses = null) {
    switch (type) {
		case 'uk-card':
			if (typeof(selector) !== 'undefined' && selector !== null) {
				selector.classList.add(
					'uk-card', 
					'uk-card-default', 
					'uk-card-small', 
					'uk-card-body'
				);
				if (typeof(additionalClasses) !== 'undefined' && additionalClasses !== null) {
					selector.classList.add(additionalClasses);
				}
			}
			break;
		
		case 'uk-table':
			selector.classList.add(
				'uk-table', 
				'uk-table-divider', 
				'uk-table-middle', 
				'uk-table-small', 
				'uk-table-responsive', 
				'uk-text-small'
			);
			break;
	
		default: null
			break;
	}
}



/**
 * @function convert
 * @description Type your description here.
 * @memberof functions
 * @param {String} Selector The DOM element to apply the conversion.
*/
function convert(selector, removeClasses, addClasses) {
	switch (selector) {
		// case /((all)|(All))/:
		case /(querySelector)([^All])+/:
			// selector = selector;
			if (typeof(selector) !== 'undefined' && selector !== null) {
				selector.classList.remove(removeClasses);
				selector.classList.add(addClasses);
			}
			break;
	
		default: null
			break;
	}
}