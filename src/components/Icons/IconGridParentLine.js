import React, { Component } from "react"

import { CopyToClipboard } from "react-copy-to-clipboard"
import SyntaxHighlighter from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/hljs"
import ContainerLayout from "../Containers/ContainerLayout"

class IconGridParentLine extends Component {
	constructor() {
		super()
		const initialCodeString = `<span class="ico grid-parent-line">\n  <span>grid parent-line</span>\n</span>`
		this.state = {
			selected: tomorrow,
			code: initialCodeString,
			showLineNumbers: true,
			copied: false
		}
	}
	render() {
		return (
			<div className="_source-icon">
				<h4 className="_h4">Grid-Parent-Line</h4>
				<ContainerLayout>
					<span className="ico grid-parent-line">
						<span>grid parent line</span>
					</span>
				</ContainerLayout>

				<div className="_example">
					<SyntaxHighlighter language="html" style={this.state.selected}>
						{this.state.code}
					</SyntaxHighlighter>

					<input hidden value={this.state.code} onChange={({ target: { value } }) => this.setState({ value, copied: false })} />
					<CopyToClipboard text={this.state.code} onCopy={() => this.setState({ copied: true })}>
						<button>Copy to clipboard</button>
					</CopyToClipboard>

					{this.state.copied ? <span className="copied">The HTML has been copied to your clipboard.</span> : null}
				</div>
			</div>
		)
	}
}

export default IconGridParentLine
