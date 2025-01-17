import { App, PluginSettingTab, Setting } from "obsidian";
import HideSidebarsOnWindowResizePlugin from "./main";

export interface HideSidebarsOnWindowResizeSettings {
	leftMinWidth: number;
	rightMinWidth: number;
}

export const DEFAULT_SETTINGS: HideSidebarsOnWindowResizeSettings = {
	leftMinWidth: 1400,
	rightMinWidth: 1100,
};

export class SettingsTab extends PluginSettingTab {
	plugin: HideSidebarsOnWindowResizePlugin;

	constructor(app: App, plugin: HideSidebarsOnWindowResizePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h3", { text: "Hide Sidebars on Window Resize" });

		new Setting(containerEl)
			.setName("Hide the left sidebar when the window is this narrow")
			.setDesc(
				"Increase this to hide the left sidebar sooner; decrease it to delay hiding"
			)
			.addText((text) =>
				text
					.setPlaceholder(`Default: ${DEFAULT_SETTINGS.leftMinWidth}`)
					.setValue(this.plugin.settings.leftMinWidth.toString())
					.onChange(async (value) => {
						const num = parseInt(value);
						if (num) {
							this.plugin.settings.leftMinWidth = num;
						} else {
							this.plugin.settings.leftMinWidth =
								DEFAULT_SETTINGS.leftMinWidth;
						}
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Hide the right sidebar when the window is this narrow")
			.setDesc(
				"Increase this to hide the right sidebar sooner; decrease it to delay hiding"
			)
			.addText((text) =>
				text
					.setPlaceholder(
						`Default: ${DEFAULT_SETTINGS.rightMinWidth}`
					)
					.setValue(this.plugin.settings.rightMinWidth.toString())
					.onChange(async (value) => {
						const num = parseInt(value);
						if (num) {
							this.plugin.settings.rightMinWidth = num;
						} else {
							this.plugin.settings.rightMinWidth =
								DEFAULT_SETTINGS.rightMinWidth;
						}
						await this.plugin.saveSettings();
					})
			);
	}
}
