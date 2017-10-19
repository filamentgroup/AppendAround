# AppendAround

## A pattern for responsive markup

- © 2012, @scottjehl, Filament Group, Inc. MIT/GPL 

## How To

1. Insert potential element containers throughout the DOM
1. give each container a data-set attribute with a value that matches all other containers' values
1. Place your appendAround content in one of the potential containers
1. Configure your CSS to only display one potential container at a time (and display others depending on @media conditions in your CSS)
1. Call appendAround() on that element when the DOM is ready, and it'll keep itself in a visibile container at all times

## [Demo](https://master-origin-appendaround.fgview.com/demo/)

## Sample markup

```
<!-- potential container for appendAround -->
<div class="foo" data-set="foobarbaz"></div>

<ul>
	<li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
	<li>Aliquam tincidunt mauris eu risus.</li>
	<li>Vestibulum auctor dapibus neque.</li>
</ul>

<!-- potential container for appendAround -->
<div class="bar" data-set="foobarbaz"></div>

<ul>
	<li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
	<li>Aliquam tincidunt mauris eu risus.</li>
	<li>Vestibulum auctor dapibus neque.</li>
</ul>

<!-- initial container for appendAround -->
<div class="baz" data-set="foobarbaz">
	<p class="sample">Sample appendAround Element</p>
</div>
```

## Sample CSS

```
/* the sample appendaround element */
.sample {
	padding: 1em;
	background: tan;
}

.baz {
	display: block;
}
.foo,
.bar {
	display: none; 
}

@media (min-width: 30em){
	.bar {
		display: block;
	}
	.foo, .baz {
		display: none; 
	}
}

@media (min-width: 50em){
	div.foo {
		display: block;
	}
	div.bar, div.baz {
		display: none; 
	}
}
```


## Sample JavaScript call

```
$( ".sample" ).appendAround();
```
