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
	// remove loader
	setTimeout(()=> {
		let loader = document.querySelector('.loader');
		loader.classList.add('is-finished');
		document.body.classList.remove(noScroll);
		setTimeout(()=> { loader.remove(); }, 200);
	}, 1500);
	
	// auto collapse overdue items
	// document.querySelector('.overdue-heading td').click();
	
	// add or remove classes for various animations
	// setTimeout(()=> {
	// 	document.querySelector('table th:nth-child(8)').style.minWidth = '200px';
	// }, 2000);
});



// Disable URL hash when clicking 'Resources' in the topnav.
// $(document).ready(function() {
// 	$('a[href="#"]').on('click', function(event) {
// 		event.preventDefault;
// 	});
// });



/**
 * @name globalVariables
 * @group variables
 */
const noScroll = 'no-scroll';



/**
 * Create loader elem to hide content during page init.
 * 
 * @function loader();
 * @group functions
 */
function loader() {
	let loader = document.createElement('div');
	loader.classList.add('loader', 'is-loading');
	
	document.body.appendChild(loader);
	document.body.classList.add('no-scroll');
	
	// remove loading graphic after 1s 
	setTimeout(()=> {
		document.body.classList.add(
			'loading-finished', 
			'uk-offcanvas-content'
		);
	}, 1000);
}



/**
 * Remove elements via querySelectorAll();
 * 
 * @function removeElement(element);
 * @group functions
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
 * Append stylesheets to just before the <body> tag opens.
 * 
 * @function removeElement(element);
 * @group functions
 */
function addCSS(string) {
    let head   = document.getElementsByTagName('head')[0];
    let style  = document.createElement('link');
    style.href = string;
    style.rel  = 'stylesheet';
    head.append(style);
}



/**
 * Tasks list.
 * 
 * @name liveResults
 * @group pageSpecifics
 */
(()=> {
	let element = document.querySelector('.bs-component');
	if (typeof(element) !== 'undefined' && element !== null) {
		let taskList = document.querySelector('.bs-component');
		let table	 = taskList.querySelector('table');
		let head	 = taskList.querySelector('thead > tr');
		
		
		/**
		 * Remove a[target="_blank"] attr from .live-results;
		 */
		let tableLinks = taskList.querySelectorAll('table a[target="_blank"]');
		for (let i = 0; i < tableLinks.length; i++)
			tableLinks[i].removeAttribute('target');
		
		
		/**
		 * Alter table style.
		 */
		let taskWrapper = document.querySelector('.live-results');
		let taskWrapperInner = document.querySelector('.row');
		taskWrapper.classList.add('uk-padding');
		taskWrapperInner.classList.add(
			'uk-card', 
			'uk-card-default', 
			'uk-card-small', 
			'uk-card-body'
		);
		
		
		/**
		 * Add and remove classes from search form buttons.
		 */
		let tableClasses = taskList.querySelector('table');
		tableClasses.classList.add(
			'uk-table', 
			'uk-table-divider', 
			'uk-table-middle', 
			'uk-table-small', 
			'uk-table-responsive', 
			'uk-text-small'
		);
		tableClasses.classList.remove(
			'table', 
			'table-striped', 
			'table-hover'
		);
		
		
		/**
		 * Change text and add width util classes to thead elems.
		 * 
		 * @member expand — Expands the column width to fill the remaining space and apply a min-width.
		 * @member shrink — Shrinks the element to reduce the column width to fit its content.
		 */
		let expand = 'uk-table-expand';
		let shrink = 'uk-table-shrink';
		
		
		/**
		 * thead => View/Status
		 */
		let view = head.querySelector('th:nth-child(1)');
		view.innerHTML = 'Status';
		view.classList.add(shrink);
		
		
		/**
		 * thead => Task: Client/Project
		 */
		let description = head.querySelector('th:nth-child(2)');
		description.classList.add('uk-text-truncate');
		
		
		/**
		 * thead => Owner
		 */
		let owner = head.querySelector('th:nth-child(3)');
		owner.innerHTML = 'Task Owner';
		owner.classList.add(shrink, 'owner');
		owner.removeAttribute('width');
		
		
		/**
		 * thead => Due Date
		 */
		let due = head.querySelector('th:nth-child(4)');
		due.innerHTML = 'Due';
		due.classList.add(shrink, 'due');
		due.removeAttribute('width');
		
		
		/**
		 * thead => Due Date
		 */
		let allotted = head.querySelector('th:nth-child(5)');
		allotted.innerHTML = 'Hrs.';
		allotted.classList.add(shrink, 'allotted');
		
		
		/**
		 * thead => Allotted
		 */
		let logged = head.querySelector('th:nth-child(6)');
		logged.innerHTML = 'Logged';
		logged.classList.add(shrink, 'logged');
		
		
		/**
		 * thead => Progress
		 */
		let progress = head.querySelector('th:nth-child(8)');
		progress.classList.add('uk-width-auto', 'task-progress');
		
		
		/**
		 * tbody => Remove day if there's no tasks.
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
		 * tbody => Remove heading if days don't have tasks (.empty);
		 */
		let empty = document.getElementsByClassName('.empty');
		let emptyHeader = document.querySelector('tr[class="  default heading"]') || document.querySelector('tr[class="  info heading"]');
		for (let i = 0; i < emptyHeader.length; i++) {
			emptyHeader.style.display = 'none';
		}
		
		
		/**
		 * tbody => Project link class.
		 */
		let taskLink = table.querySelectorAll('.task-link');
		for (let i = 0; i < taskLink.length; i++)
			taskLink[i].classList.add('uk-text-truncate');
		
		let project = table.querySelectorAll('.client-project');
		for (let i = 0; i < project.length; i++)
			project[i].classList.add('uk-text-meta', 'uk-text-truncate');
		
		
		/**
		 * tbody => Project owner <td> class.
		 */
		let taskOwner = document.querySelectorAll('.bs-component tr td:nth-child(3)');
		for (let i = 0; i < taskOwner.length; i++)
			taskOwner[i].classList.add('owner');
		
		
		/**
		 * tbody => Due date <td> class.
		 */
		let dueDate = document.querySelectorAll('.bs-component tr td:nth-child(4)');
		for (let i = 0; i < dueDate.length; i++)
			dueDate[i].classList.add('due');
		
		
		/**
		 * tbody => Hours allotted <td> class.
		 */
		let hrsAllotted = document.querySelectorAll('.bs-component tr td:nth-child(5)');
		for (let i = 0; i < hrsAllotted.length; i++)
			hrsAllotted[i].classList.add('allotted');
		
		
		/**
		 * tbody => Hours logged <td> class.
		 */
		let hrsLogged = document.querySelectorAll('.bs-component tr td:nth-child(6)');
		for (let i = 0; i < hrsLogged.length; i++)
			hrsLogged[i].classList.add('logged');
		
		
		/**
		 * tbody => Add "% complete" uk-tooltip to progress <td> class elements.
		 * Takes the value of progress[value="##"] and applies that to a new title attribute.
		 * 
		 * @name progressTooltips
		 */
		let taskProgress = document.querySelectorAll('.bs-component tr td:nth-child(8)');
		for (let i = 0; i < taskProgress.length; i++) {
			taskProgress[i].classList.add('task-progress')
		}
		
		setTimeout(()=> {
			let task_progress = document.querySelector('.task-progress progress');
			for (let i=0; i < task_progress.length; i++)
				task_progress[i].setAttribute('uk-tooltip', 'duration: 20; delay: 0;');
		}, 400);
		
		
		// -- 90% Complete
		// @memberof progressTooltips
		let prog90 = document.querySelectorAll('.bs-component tr td:nth-child(8) > progress[value="90"]');
		if (typeof(prog90) !== 'undefined' && prog90 !== null) {
			for (let i = 0; i < prog90.length; i++) { prog90[i].setAttribute('title', '90% Complete'); }
		}
		
		// -- 80% Complete
		// @memberof progressTooltips
		let prog80 = document.querySelectorAll('.bs-component tr td:nth-child(8) > progress[value="80"]');
		if (typeof(prog80) !== 'undefined' && prog80 !== null) {
			for (let i = 0; i < prog80.length; i++) { prog80[i].setAttribute('title', '80% Complete'); }
		}
		
		// -- 70% Complete
		// @memberof progressTooltips
		let prog70 = document.querySelectorAll('.bs-component tr td:nth-child(8) > progress[value="70"]');
		if (typeof(prog70) !== 'undefined' && prog70 !== null) {
			for (let i = 0; i < prog70.length; i++) { prog70[i].setAttribute('title', '70% Complete'); }
		}
		
		// -- 60% Complete
		// @memberof progressTooltips
		let prog60 = document.querySelectorAll('.bs-component tr td:nth-child(8) > progress[value="60"]');
		if (typeof(prog60) !== 'undefined' && prog60 !== null) {
			for (let i = 0; i < prog60.length; i++) { prog60[i].setAttribute('title', '60% Complete'); }
		}
		
		// -- 50% Complete
		// @memberof progressTooltips
		let prog50 = document.querySelectorAll('.bs-component tr td:nth-child(8) > progress[value="50"]');
		if (typeof(prog50) !== 'undefined' && prog50 !== null) {
			for (let i = 0; i < prog50.length; i++) { prog50[i].setAttribute('title', '50% Complete'); }
		}
		
		// -- 40% Complete
		// @memberof progressTooltips
		let prog40 = document.querySelectorAll('.bs-component tr td:nth-child(8) > progress[value="40"]');
		if (typeof(prog40) !== 'undefined' && prog40 !== null) {
			for (let i = 0; i < prog40.length; i++) { prog40[i].setAttribute('title', '40% Complete'); }
		}
		
		// -- 30% Complete
		// @memberof progressTooltips
		let prog30 = document.querySelectorAll('.bs-component tr td:nth-child(8) > progress[value="30"]');
		if (typeof(prog30) !== 'undefined' && prog30 !== null) {
			for (let i = 0; i < prog30.length; i++) { prog30[i].setAttribute('title', '30% Complete'); }
		}
		
		// -- 20% Complete
		// @memberof progressTooltips
		let prog20 = document.querySelectorAll('.bs-component tr td:nth-child(8) > progress[value="20"]');
		if (typeof(prog20) !== 'undefined' && prog20 !== null) {
			for (let i = 0; i < prog20.length; i++) { prog20[i].setAttribute('title', '20% Complete'); }
		}
		
		// -- 10% Complete
		// @memberof progressTooltips
		let prog10 = document.querySelectorAll('.bs-component tr td:nth-child(8) > progress[value="10"]');
		if (typeof(prog10) !== 'undefined' && prog10 !== null) {
			for (let i = 0; i < prog10.length; i++) { prog10[i].setAttribute('title', '10% Complete'); }
		}
		
		// -- 0% Complete
		// @memberof progressTooltips
		let prog00 = document.querySelectorAll('.bs-component tr td:nth-child(8) > progress[value="0"]');
		if (typeof(prog00) !== 'undefined' && prog00 !== null) {
			for (let i = 0; i < prog00.length; i++) { prog00[i].setAttribute('title', '0% Complete'); }
		}
	}
})();



/**
 * Single task pages.
 * 
 * @name taskLogs
 * @group pageSpecifics
 */
(()=> {
	let element = document.getElementById('tasklogs-table');
	if (typeof(element) !== 'undefined' && element !== null) {
		
		
		/**
		 * Remove 'Back to Project' button;
		 */
		let back = document.querySelectorAll('.option-button')[0];
		back.id = 'backToProject';
		back.style.display = 'none';
		
		/**
		 * Add container to info wrapper elem.
		 */
		let info = document.querySelector('.info-wrapper');
		info.classList.add('uk-margin-medium-bottom');
		
		
		/**
		 * Add style and positioning to new log button.
		 */
		document.querySelectorAll('.option-button')[1].id = 'logButton';
		let newLogWrap	= document.getElementById('logButton');
		let logButton	= document.getElementById('new-log-link');
		newLogWrap.classList.add('uk-container', 'uk-container-smaller', 'uk-text-center');
		newLogWrap.classList.remove('option-button');
		logButton.classList.add('uk-button', 'uk-button-primary', 'uk-width-1-1');
		logButton.classList.remove('btn');
		
		
		/**
		 * Task logs (comments) conversions; turn log comments into individual cards.
		 */
		(()=> {
			let taskLogs = document.getElementById('tasklogs-table');
			taskLogs.classList.add('uk-table', 'uk-table-divider', 'uk-table-top', 'uk-table-small', 'uk-container', 'uk-container-smaller');
			
			// -- add uk-card and sky-task classes to each log item
			let log = document.querySelectorAll('#tasklogs-table tbody > tr');
			for (let i=0; i < log.length; i++)
				log[i].classList.add('sky-task', 'uk-card', 'uk-card-default', 'uk-card-body');
			
				
			// -- hide hours if hours = null
			let emptyHours = document.getElementsByClassName('hours');
			for (let i = 0; i < emptyHours.length; i++) {
				let isEmpty = emptyHours[i];
				let content = isEmpty.innerHTML.trim();
				if (content == '0.00') {
			  		isEmpty.classList.add('is-empty');
				}
			}
			
			
			/**
			 * Remove empty paragraph tags from .comment elems.
			 * @todo Convert to vanilla javascript 
			 */
			$('.comment p').each(function() {
		    	if ($(this).html().match(/^\s*&nbsp;\s*$/)) {
		        	(this).remove();
		    	}
		    	if ($(this).html().match(/^\s*&nbsp;\s*$/)) {
		        	$(this).remove();
		    	}
			});
		})();
		
		
		/**
		 * Remove and convert last tr.total-hours;
		 */
		let last = document.querySelector('.total-hours');
		if (typeof(last) !== 'undefined' && last !== null) {
			last.classList.remove('sky-task');
			last.style.borderTop = '0';
			last.querySelector('td:first-child').classList.remove('right');
			last.querySelector('td:first-child').classList.add('uk-float-right');
			last.querySelector('td:last-child').classList.add('uk-float-left');
		}
		
		
		/**
		 * #details informational items
		 */
		let details = document.getElementById('details');
		details.classList.add('uk-grid', 'uk-grid-collapse', 'uk-width-1-1', 'uk-child-width-1-4@m');
		details.querySelector('.info-list.no-border > li:nth-child(5)').classList.add('uk-width-1-1@m');
		
		
		/**
		 * modify property boxes
		 */
		let property = details.getElementsByClassName('property-box');
		let propTitle = details.getElementsByClassName('pb-title');
		for (let i=0; i < property.length; i++)
			property[i].classList.add('uk-text-lead', 'uk-text-center', 'uk-card', 'uk-card-default', 'uk-card-small', 'uk-card-body');
		for (let i=0; i < propTitle.length; i++)
			propTitle[i].classList.add('uk-text-meta');
		property[4].classList.add('uk-width-1-1');
		
		
		/**
		 * modify log description items
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
		 * description tabs
		 */
		let switcher = document.getElementById('descr-tab');
		switcher.classList.add('uk-subnav', 'uk-subnav-pill');
		switcher.setAttribute('uk-switcher', '');
		
		// -- description wrapper
		let descriptionWrapper = document.getElementById('details-description');
		descriptionWrapper.classList.add('uk-margin');
		
		// -- description box
		let description = document.getElementById('gen-descr');
		description.classList.add('uk-card', 'uk-card-default', 'uk-card-small', 'uk-card-body', 'uk-width-1-1', 'uk-margin');
		
		
		/**
		 * spread tasks
		 */
		let spreadWrapper = document.querySelector('form.standard');
		if (typeof(spreadWrapper) !== 'undefined' && spreadWrapper !== null) {
			spreadWrapper.classList.add('uk-width-1-1');
			spreadWrapper.querySelector('.spread').classList.add('uk-card', 'uk-card-default', 'uk-card-small', 'uk-card-body', 'uk-margin');
			spreadWrapper.querySelector('h4').classList.add('uk-form-label');
			
			let spreadGrid = spreadWrapper.querySelector('.pto-date');
			spreadGrid.classList.add('uk-grid', 'uk-grid-collapse', 'uk-width-1-1', 'uk-child-width-1-5@m');
			spreadGrid.setAttribute('uk-grid', '');
			
			let spreadItems = spreadWrapper.querySelectorAll('.pto-date > .spread-task-div');
			for (let i=0; i < spreadItems.length; i++)
				spreadItems[i].classList.add('uk-margin');
		}
		
		
		/**
		 * radialIndicator.js
		 */
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
		}, 4500);
	}
})();



/**
 * New log form entry.
 * 
 * @name logForm
 * @group pageSpecifics
 * @memberof taskLogs
 */
(()=> {
	let element = document.getElementById('logform');
	if (typeof(element) !== 'undefined' && element !== null) {
		
		
		/**
		 * uncheck notify by default (used to be checked by default)
		 */
		setTimeout(()=> {
			document.getElementById('toggle-all').click();
		}, 600);
		
		
		/**
		 * control functionality of the new log button
		 */
		let newLogBtn = document.getElementById('new-log-link');
		newLogBtn.classList.add('uk-button', 'uk-button-default');
		// newLogBtn.setAttribute('uk-toggle', '');
		// newLogBtn.href = '#logform';
		newLogBtn.addEventListener('click', ()=> {
			if (form.classList.contains('uk-open')) {
				document.body.classList.remove(noScroll);
				form.classList.remove('uk-open');
				form.style.display = 'none';
			} else {
				document.body.classList.add(noScroll);
				form.classList.add('uk-open');
				form.classList.remove('skynet-modal-closed');
				form.style.display = 'block';
			}
		});
		
		
		/**
		 * transform #logform into full-screen modal
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
		 * New log progress control
		 */
		let progressList = progress.querySelector('ul');
		progressList.classList.add('uk-iconnav', 'uk-child-width-expand');
		
		if (typeof(progress2) !== 'undefined' && progress2 !== null) {
			let progressParentList = progressParent.querySelector('ul');
			progressParentList.classList.add('uk-iconnav', 'uk-child-width-expand');
		}
		
		
		/**
		 * add modal close btn
		 */
		let logClose = document.createElement('button');
		logClose.classList.add('uk-modal-close-full', 'uk-close-large', 'uk-close', 'uk-icon', 'uk-padding-small', 'uk-animation-fade');
		logClose.setAttribute('type', 'button');
		logClose.setAttribute('uk-close', '');
		
		form.querySelector('.info-wrapper').appendChild(logClose);
		
		logClose.addEventListener('click', ()=> {
			document.body.classList.remove(noScroll);
			form.classList.remove('uk-open');
			form.classList.add('skynet-modal-closed');
			setTimeout(()=> { form.classList.add('skynet-modal-closed'); }, 300);
		});
		
		
		/**
		 * turn contacts into uk-accordion
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
		 * -- hide empty contact groups
		 * @todo convert to vanilla javascript 
		 * @link https://stackoverflow.com/a/22782542/8296677
		 */
		$('#log-contacts').find('ul').each(function(){
		   var txt = $("li", this).text();
		   if(txt.length <= 0){
		      $(this).hide();
			  $(this).parent().addClass('empty');
		   }
		});
		
		
		/**
		 * clear all inline styles
		 * @link https://stackoverflow.com/a/25904055/8296677
		 */
		let divs = form.querySelectorAll('*');
		Array.prototype.forEach.call(divs, (element)=> {
		    element.removeAttribute('style');
		});
		
		
		/**
		 * remove all instances of .field;
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
 * Search console controls and tweaks.
 * 
 * @name searchConsole
 * @group pageSpecifics
 * @memberof liveResults
 */
(()=> {
	let element = document.querySelector('.search-form');
	if (typeof(element) !== 'undefined' && element !== null) {
		
		
		/**
		 * Add .uk-* classes to search wrappers.
		 */
		let searchForm = document.querySelector('.search-form');
		searchForm.classList.add(
			'uk-card', 
			'uk-card-default', 
			'uk-card-small', 
			'uk-card-body'
		);
		
		let console = document.querySelector('.search-console');
		console.classList.add('uk-section-small');
		
		let search = document.querySelector('.basic-search');
		search.classList.add('uk-container');
		
		
		/**
		 * Add uk-* form classes to search elems
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
		 * Add and remove classes from search form buttons
		 */
		let submit = search.querySelector('input[type="submit"]');
		submit.classList.add(
			'uk-button', 
			'uk-button-primary', 
			'uk-button-small'
		);
		submit.classList.remove('button-bg');
		
		let clear = search.querySelector('input[value="Clear"]');
		clear.classList.add(
			'uk-button', 
			'uk-button-primary', 
			'uk-button-small',
			'uk-float-right'
		);
		clear.classList.remove('button-bg');
	}
})();



/**
 * Add reposive meta tag to document.head;
 * 
 * @name metaReponsive
 */
(()=> {
	let title = document.head.getElementsByTagName('title')[0];
	let meta = document.createElement('meta');
	
	meta.setAttribute('name', 'viewport');
	meta.setAttribute('content', 'width=device-width, initial-scale=1, shrink-to-fit=no');
	
	document.head.insertBefore(meta, title);
})();



/**
 * Control project breadcrumbs nav.
 * 
 * @name breadcrumbs
 * @group pageSpecifics
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
 * 
 * @name openTicket
 * @group pageSpecifics
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
 * Sidebar navigation using UIkit's .uk-offcanvas;
 * 
 * @name sidebarNavigation
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
		
		let to_do		= primary.querySelector('li:first-child > a');
		let team		= primary.querySelector('li:nth-child(2) > a');
		let traffic		= primary.querySelector('li:nth-child(3) > a');
		let projects	= primary.querySelector('li:nth-child(4) > a');
		let tasks		= primary.querySelector('li:nth-child(5) > a');
		let clients		= primary.querySelector('li:nth-child(6) > a');
		
		// change "To Do" to "My Tasks"
		to_do.innerHTML = 'My Tasks';
		
		// grab value of #username and apply it to top <li> item
		setTimeout(()=> {
			let name = document.getElementById('username');
			username.style.display = 'none';
			name.innerHTML = name.innerHTML.replace('Logged in as ', `<span class="uk-text-meta">Logged in as</span>`);
			let value = name.innerHTML;
			
			let listItem = document.createElement('li');
			listItem.innerHTML = `<div class="" id="active-user">${value}</div>`;
			
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
		
		// create settings link
		let settings = document.createElement('li');
		settings.innerHTML = `
			<a class="skynet-offcanvas-link" id="settings">
        		Settings
        		<i class="material-icons">settings</i>
        	</a>
		`;
		primary.appendChild(settings);
		
		// extract href from a[title="Account Admin"] and apply it to settings link
		(()=> {
			let admin = document.querySelector('a[title="Account Admin"]');
			admin.style.display = 'none';
			let link = admin.href;
			document.getElementById('settings').href = link;
		})();
	}
})();



/**
 * Header #branding elem styles and tweaks.
 * 
 * @name headerBranding
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
		
		branding.classList.add('uk-navbar', 'uk-navbar-nav', 'uk-navbar-container', 'uk-navbar-transparent', 'uk-background-primary', 'uk-light');
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
		// 	document.body.classList.remove(noScroll);
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
		// 	document.body.classList.add(noScroll);
		// 	branding.classList.remove('skynet-modal-closed');
		// 	branding.classList.add('uk-open');
		// });
	}
})();



/**
 * Login page attributes, styles, and tweaks.
 * 
 * @name loginPage
 * @group pageSpecifics
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
 * Client temperatures (project status overview) styles and tweaks.
 * 
 * @name clientTemperatures
 * @group pageSpecifics
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
 * Resources (usefule & relative external links) sidebar configuration.
 * 
 * @name resourcesList
 * @group globalElements
 */
(()=> {
	let element = document.querySelector('#branding .resources');
	if (typeof(element) !== 'undefined' && element !== null) {
		let button	= document.querySelector('#branding .resources');
		let sidebar = button.getElementsByTagName('ul')[0];
		let content = document.getElementById('content-wrapper');
		let active	= 'resources-open';
		
		// force-prevent hash in URL
		// note: e.preventDefault & return false didn't work
		button.setAttribute('onclick', 'return false;');
		
		// add click functionality
		button.addEventListener('click', (e)=> {
			e.preventDefault;
			
			if (!sidebar.classList.contains(active)) {
				sidebar.classList.add(active);
				content.classList.add(active);
			} else {
				sidebar.classList.remove(active);
				content.classList.remove(active);
			}
			
			return false;
		});
	}
})();



/**
 * Apply .uk-* classes across a plethora of default elements.
 * 
 * @name applyClasses
 * @group globalElements
 */
(()=> {
	const anim_delay	= 'animation-delay-default';
	const anim_btmSmall = 'uk-animation-slide-bottom-small';
	
	
	/**
	 * Add .uk-margin classes
	 * 
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
	 * 
	 * @var label = <label />
	 */
	let formLabel = document.querySelectorAll('form label');
	for (let i = 0; i < formLabel.length; i++)
		formLabel[i].classList.add('uk-form-label');
		
		
	/**
	 * Add .uk-input classes
	 * 
	 * @var input = <input type="text" />
	 */
	let input = document.querySelectorAll('input[type="text"]');
	for (let i = 0; i < input.length; i++)
		input[i].classList.add('uk-input');
			
			
	/**
	 * Add .uk-input classes
	 * 
	 * @var input = <input type="text" />
	 */
	let pass = document.querySelectorAll('input[type="password"]');
	for (let i = 0; i < pass.length; i++)
		pass[i].classList.add('uk-input');
	
	
	/**
	 * Add .uk-checkbox classes
	 * 
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
	let select = document.querySelectorAll('select');
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
 * Custom resources list in JSON.
 * 
 * @name resourcesList
 * @group globalElements
 * @link https://stackoverflow.com/a/8963716/8296677
 */
(()=> {
	let resourcesArray = `{
	    'resource': [
	        { name: 'Browserstack', url: 'http://www.browserstack.com' },
	        { name: 'Catalyst Lab', 'url': 'http://patterns.dev.sabrehospitality.com/' },
	        { name: 'Central Data Collection', 'url': 'http://cdc.esiteportal.com/admin/login.php' },
	        { name: 'Catalyst Lab', 'url': 'http://patterns.dev.sabrehospitality.com/' },
	        { name: 'Clone CMT', 'url': 'http://context.sabredemos.com/client/login.php' },
	        { name: 'Cloudforge SVN', 'url': 'https://app.cloudforge.com/' },
	        { name: 'DotP', 'url': 'http://skynet.esiteportal.com/dotp/index.php' },
	        { name: 'InVision', 'url': 'https://projects.invisionapp.com' },
	        { name: 'Knowledge Foundation Center', 'url': 'http://skynet.esiteportal.com/kfc-remote-login.php' },
	        { name: 'Kronos', 'url': 'https://sabre.kronos.net/' },
	        { name: 'MyCareer', 'url': 'http://mycareer.sabre.com' },
	        { name: 'DMS Portal', 'url': 'http://dmsportal.sabrehospitality.com/' },
	        { name: 'eSite Portal', 'url': 'http://www.esiteportal.com/index.php?SECTION=login' },
	        { name: 'Profit Center', 'url': 'http://skynet.esiteportal.com/PPC/login.php' },
	        { name: 'Sabre Benefits Portal', 'url': 'https://ess5.empyreanbenefitsolutions.com/sabre/security/login' },
	        { name: 'Sabre Wiki', 'url': 'http://wiki.esitelabs.com:1081/index.php/Main_Page' },
	        { name: 'SHS User Admin', 'url': 'https://shsuseradmin.sabrehospitality.com/' },
	        { name: 'Shutterstock', 'url': 'http://www.shutterstock.com/' },
	        { name: 'Swamp (MCC/CMT)', 'url': 'http://esiteinteractive.com/swamp/login.php' },
	        { name: 'Teamphoria', 'url': 'https://shs.teamphoria.com/' },
	    ]
	}`;
	
	//convert object to json string
	// const resourcesList = JSON.stringify(resourcesArray);
	
	// //convert string to Json Object
	// // console.log(JSON.parse(resourcesList));
	
	// var resource = [];
	// var obj = {
	//     'name'	:	name,
	//     'url'	:	url
	// };
	// resource.push(obj);
	
	// let employeeObject = new Resource('Browserstack', 'http://www.browserstack.com');
	// JSON.stringify(employeeObject);
	
	// let template = document.createElement('ul');
	// template.innerHTML = `
	// 	<li>
	// 		<a href="${resource.url}" target="_blank">${resource.name}</a>
	// 	</li>
	// `;
	
	// // create resource link function
	// function Resource(name, url) {
	//     this.name = name;
	//     this.url  = url;
	// };
})();



/**
 * Control images inside task log comments.
 * 
 * @name imageWrap
 * @group pageSpecifics
 * @memberof taskLogs
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
 * Task attachment; file upload tweaks.
 * 
 * @name fileUpload
 * @group pageSpecifics
 * @memberof taskLogs
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
 * User settings (Account Admin) styles and tweaks.
 * 
 * @name userSettings
 * @group pageSpecifics
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
		// swapper.setAttribute('uk-switcher', 'connect: .switcher-container;');
		
		// let myclients = document.getElementById('myclients');
		// myclients.classList.add('uk-switcher', 'switcher-container', 'uk-active');
		
		// let myinterface = document.getElementById('myinterface');
		// myinterface.classList.add('uk-switcher', 'switcher-container');
	}
})();