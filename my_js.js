"use strict";
Object.prototype.nativeData = function(attribute, value) {
	let elements = this;
	if(attribute === undefined && value === undefined)
	{
		let dataSet = {};
		if(typeof elements === 'object')
		{
			if(window.jQuery !== undefined && elements instanceof jQuery)
			{
				dataSet = [];
				for(const element of elements)
				{
					if(element.nodeType === 1)
					{
						dataSet = [...dataSet, Object.assign({}, element.dataset)];
					}
				}
			}
			else
			{
				if(elements.nodeType === 1)
				{
					dataSet = Object.assign({}, elements.dataset);
				}
				else if(elements.constructor.name === 'NodeList')
				{
					dataSet = [];
					for(const element of elements)
					{
						if(element.nodeType === 1)
						{
							dataSet = [...dataSet, Object.assign({}, element.dataset)];
						}
					}
				}
			}
		}
		return dataSet;
	}
	else
	{
		if(typeof elements === 'object')
		{
			if(window.jQuery !== undefined && elements instanceof jQuery)
			{
				for(const element of elements)
				{
					if(element.nodeType === 1)
					{
						if(typeof attribute === 'string')
						{
							element.setAttribute(`data-${attribute}`, (typeof value === "function" ? value(element) : value));
						}
						else if(typeof attribute === 'object')
						{
							Object.keys(attribute).map((property) => {
								element.setAttribute(`data-${property}`, (typeof attribute[property] === "function" ? attribute[property](element) : attribute[property]));
							});
						}
					}
				}
			}
			else
			{
				if(elements.nodeType === 1)
				{
					if(typeof attribute === 'string')
					{
						elements.setAttribute(`data-${attribute}`, (typeof value === "function" ? value(elements) : value));
					}
					else if(typeof attribute === 'object')
					{
						Object.keys(attribute).map((property) => {
							elements.setAttribute(`data-${property}`, (typeof attribute[property] === "function" ? attribute[property](elements) : attribute[property]));
						});
					}
				}
				else if(elements.constructor.name === 'NodeList')
				{
					for(const element of elements)
					{
						if(element.nodeType === 1)
						{
							if(typeof attribute === 'string')
							{
								element.setAttribute(`data-${attribute}`, (typeof value === "function" ? value(element) : value));
							}
							else if(typeof attribute === 'object')
							{
								Object.keys(attribute).map((property) => {
									element.setAttribute(`data-${property}`, (typeof attribute[property] === "function" ? attribute[property](element) : attribute[property]));
								});
							}
						}
					}
				}
			}
		}
	}
};
