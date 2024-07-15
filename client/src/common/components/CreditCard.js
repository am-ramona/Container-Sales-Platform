export default function CreditCard({ ...props }) {
  return (
    <svg width={props.width} height={props.height} xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fill-rule="evenodd">
            <path d="M23 19.335c.119 0 .235.021.346.059a2.176 2.176 0 0 0-.307 1.107c0 .404.115.778.304 1.103a1.058 1.058 0 0 1-.343.064c-.615 0-1.115-.523-1.115-1.167 0-.643.5-1.166 1.115-1.166m2.154 0c.615 0 1.115.523 1.115 1.166 0 .644-.5 1.167-1.115 1.167s-1.115-.523-1.115-1.167c0-.643.5-1.166 1.115-1.166M23 22.668c.385 0 .76-.107 1.086-.307a2.05 2.05 0 0 0 1.068.307c1.166 0 2.115-.972 2.115-2.167 0-1.194-.949-2.166-2.115-2.166-.4 0-.77.121-1.09.319A2.053 2.053 0 0 0 23 18.335c-1.167 0-2.115.972-2.115 2.166 0 1.195.948 2.167 2.115 2.167" fill="#E20101"/><path d="M3 25h26V14.891H3V25zM3 9.891h26V8H3v1.891zm0 4h26v-3H3v3zM29 7c.55 0 1 .45 1 1v17c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1zM12.231 20.835H5.769a.5.5 0 0 0 0 1h6.462a.5.5 0 0 0 0-1zm0-1.944H5.769a.5.5 0 0 0 0 1h6.462a.5.5 0 0 0 0-1z" fill={props.fillColor} />
        </g>
    </svg>
  );
}
