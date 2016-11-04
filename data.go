package main

import (
	"fmt"
	"image/color"
	"strconv"
)

func enrichData(d *Data) {
	//convert datestamps first
	for _, task := range d.Tasks {
		processTask(d, task)
	}

	setDefaults(d)
	applyTheme(d)

	d.Days = (d.Last.Year()*365 + d.Last.YearDay()) - (d.First.Year()*365 + d.First.YearDay())

	// safe layout defaults
	// show days if < 90 days; show months if < 180 days
	if d.LayoutSteps[0] == 0 || d.LayoutSteps[1] == 0 {
		d.LayoutSteps = [2]int{90, 180}
	}

	//zoom property defaults to 100%
	if len(d.Zoom) == 0 {
		d.Zoom = "100"
	}

	zoomInt, _ := strconv.Atoi(d.Zoom)
	d.Scale = float64(zoomInt) / 100
	d.W, d.H, d.RowH, d.FontSize = 1024.0*d.Scale, 768.0*d.Scale, 20.0*d.Scale, 10.0*d.Scale
}

func validateData(d *Data) (int, string) {
	if d.Scale <= 0.0 || d.W <= 0.0 || d.H <= 0.0 || d.RowH <= 0.0 || d.FontSize <= 0.0 {
		s := fmt.Sprintf("Parameter unitialized or invalid: Scale, W, H, RowH, FontSize = %.2f, %.2f, %.2f, %.2f, %.2f\n", d.Scale, d.W, d.H, d.RowH, d.FontSize)
		return 1, s
	}

	if d.Days <= 0 {
		s := fmt.Sprintf("Invalid number of days: %d\n", d.Days)
		return 1, s
	}

	if len(d.Tasks) == 0 {
		s := fmt.Sprint("No tasks specified\n")
		return 1, s
	}

	for index, task := range d.Tasks {
		if task.StartTime.Unix() > task.EndTime.Unix() {
			s := fmt.Sprintf("Task #%d ends before it begins: %s\n", index+1, task)
			return 1, s
		}

		//blank labels are allowed
		if task.StartTime.IsZero() || task.EndTime.IsZero() {
			s := fmt.Sprintf("Task #%d is incomplete: %s", index+1, task)
			return 1, s
		}
	}
	return 0, ""
}

func setDefaults(d *Data) {
	d.FrameBorderColor = color.RGBA{0x99, 0x99, 0x99, 0xff}
	d.FrameFillColor = color.RGBA{0xff, 0xff, 0xff, 0xff}
	d.CanvasColor1 = color.RGBA{0xdd, 0xdd, 0xdd, 0xff}
	d.CanvasColor2 = color.RGBA{0xee, 0xee, 0xee, 0xff}
	d.CanvasGridColor = color.RGBA{0x99, 0x99, 0x99, 0xff}
}

func processTask(d *Data, t *Task) {
	t.StartTime = parseDateStamp(t.Start)
	t.EndTime = parseDateStamp(t.End)

	if d.First.IsZero() || t.StartTime.Unix() < d.First.Unix() {
		d.First = t.StartTime
	}

	if d.Last.IsZero() || t.EndTime.Unix() > d.Last.Unix() {
		d.Last = t.EndTime
	}

	t.BorderColor = color.RGBA{0x55, 0x55, 0x55, 0xff}
	t.FillColor = color.RGBA{0xff, 0xff, 0xff, 0xff}
}
