import React, { Component } from "react"

import { CopyToClipboard } from "react-copy-to-clipboard"
import SyntaxHighlighter from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/hljs"
import ContainerWrapper from "../Containers/ContainerWrapper"
import ContainerLayout from "../Containers/ContainerLayout"
class TablesRowSectionDividerExample extends Component {
	constructor() {
		super()
		const initialCodeString = `<div class="table-wrapper">\n   <table class="basic-table full-width">\n      <caption>Caption</caption>\n      <thead>\n         <tr>\n            <th scope="col">Aligned-left</th>\n            <th scope="col">Aligned-right</th>\n            <th scope="col">Aligned-right</th>\n            <th scope="col">Aligned-right</th>\n         </tr>\n      </thead>\n	  <tbody>\n         <tr>\n            <th scope="row">Aligned-left</th>\n            <td>Aligned-right</td>\n            <td>Aligned-right</td>\n            <td>Aligned-right</td>\n		 </tr>\n         <tr className="divider">\n            <th scope="row">Divider Row, Aligned-left</th>\n            <td>Divider Row, Aligned-right</td>\n            <td>Divider Row, Aligned-right</td>\n            <td>Divider Row, Aligned-right</td>\n         </tr>\n         <tr>\n            <th scope="row">Aligned-left</th>\n            <td>Aligned-right</td>\n            <td>Aligned-right</td>\n            <td>Aligned-right</td>\n		 </tr>\n         <tr<tr class="divider">\n            <td colSpan="4" scope="colgroup">Divider Row, Aligned-left</td>\n         </tr>\n         <tr className="section">\n            <th scope="row">Aligned-left</th>\n            <td>Aligned-right</td>\n            <td>Aligned-right</td>\n            <td>Aligned-right</td>\n         </tr>\n      </tbody>\n   </table>\n</div>`
		this.state = {
			selected: tomorrow,
			code: initialCodeString,
			showLineNumbers: true,
			copied: false
		}
	}
	render() {
		return (
			<>
				<a name="TablesRowSectionDividerExample"></a>
				<h3 className="_h3">Tables Section Divider</h3>

				<p className="_p">
					Adding a <code>class="divider"</code> to the table row.
				</p>
				<p className="_accessibility _p">
					<strong>
						<span className="_accessibility-requirement">Accessibility requirement:</span>
					</strong>
				</p>
				<p className="_accessibility _p">
					Add a <code>scope="colgroup"</code> whenever you use a <code>colspan="x"</code>.
				</p>
				<ContainerLayout>
					<div className="table-wrapper">
						<table className="basic-table full-width">
							<caption>Caption</caption>
							<thead>
								<tr>
									<th scope="col">...</th>
									<th scope="col">...</th>
									<th scope="col">...</th>
									<th scope="col">...</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th scope="row">Aligned-left</th>
									<td>Aligned-right</td>
									<td>Aligned-right</td>
									<td>Aligned-right</td>
								</tr>
								<tr className="divider">
									<th scope="row">Divider Row, Aligned-left</th>
									<td>Divider Row, Aligned-right</td>
									<td>Divider Row, Aligned-right</td>
									<td>Divider Row, Aligned-right</td>
								</tr>
								<tr>
									<th scope="row">Aligned-left</th>
									<td>Aligned-right</td>
									<td>Aligned-right</td>
									<td>Aligned-right</td>
								</tr>
								<tr className="divider">
									<td colSpan="4" scope="colgroup">
										Divider
									</td>
								</tr>
								<tr>
									<th scope="row">Aligned-left</th>
									<td>Aligned-right</td>
									<td>Aligned-right</td>
									<td>Aligned-right</td>
								</tr>
							</tbody>
						</table>
					</div>
				</ContainerLayout>

				<div className="_example">
					<h4 className="_h4">HTML Code Example</h4>
					<SyntaxHighlighter language="html" style={this.state.selected}>
						{this.state.code}
					</SyntaxHighlighter>
					<input hidden value={this.state.code} onChange={({ target: { value } }) => this.setState({ value, copied: false })} />
					<CopyToClipboard text={this.state.code} onCopy={() => this.setState({ copied: true })}>
						<button>Copy to clipboard</button>
					</CopyToClipboard>

					{this.state.copied ? <span className="copied">The HTML has been copied to your clipboard.</span> : null}
				</div>
			</>
		)
	}
}

export default TablesRowSectionDividerExample
